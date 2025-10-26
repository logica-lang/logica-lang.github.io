# Answer Set Programming (ASP) Integration

Logica provides seamless integration with Answer Set Programming through the Clingo solver. This integration allows you to solve complex combinatorial optimization problems directly within your Logica programs.

## Engine Configuration

ASP functionality is currently available only with the DuckDB engine. To enable ASP integration, configure your engine as follows:

```
@Engine("duckdb", clingo: {
  enabled: true,
  models_limit: ∞,
  time_limit: ∞
});
```

### Configuration Options

- `enabled`: Set to `true` to activate Clingo integration
- `models_limit`: Maximum number of models to return (use `∞` for unlimited)
- `time_limit`: Time limit for solving in seconds (use `∞` for no limit)

## ASP Operators

Logica introduces three specialized operators for Answer Set Programming:

### `couldbe` - Choice Rules

The `couldbe` operator creates choice rules, allowing the solver to optionally include facts in the solution:

```
# Each item could potentially be selected
Selected(item) couldbe :- Item(item, weight, value);
```

This generates the ASP choice rule: `{Selected(item) : Item(item, weight, value)}`

### `cantbe` - Constraints

The `cantbe` operator defines constraints that must not be violated in any valid solution:

```
# Cannot exceed weight limit
Overweight() cantbe :-
  Sum{weight :- Selected(item), Item(item, weight, value)} > max_weight,
  MaxWeight(max_weight);
```

This creates a constraint that eliminates any answer set where the condition holds.

### `shouldbe` - Optimization

The `shouldbe` operator specifies optimization objectives:

```
# Maximize total value
MaxValue() = Max{value :- TotalValue(value)} shouldbe;

TotalValue(total) :-
  total = Sum{value :- Selected(item), Item(item, weight, value)};
```

The solver will find answer sets that optimize (maximize or minimize) the specified expression.

## The Clingo Function

The `Clingo()` function executes ASP solving and returns the resulting models:

```
Models() = Clingo(predicates_list, additional_facts);
```

### Parameters

- `predicates_list`: Array of predicate names to include in the ASP program
- `additional_facts`: Array of `ClingoFact` objects to add to the ASP program

### Example Usage

```
# Define the ASP problem
Item("Water", 3, 20);
Item("Food", 2, 15);
Item("Rope", 1, 5);

Selected(item) couldbe :- Item(item, weight, value);

Overweight() cantbe :-
  Sum{weight :- Selected(item), Item(item, weight, value)} > 5;

# Solve the problem
Models() = Clingo(["Item", "Selected", "Overweight"], []);
```

## Extracting Results

Use `ExtractClingoCall()` to extract specific predicates from the solution models:

```
# Extract selected items from each model
SelectedItems(item, model_id:) :-
  ExtractClingoCall(item, predicate: "Selected", model_id:) = Models();

# Extract multi-argument predicates
Schedule(meeting, room, time, model_id:) :-
  ExtractClingoCall(meeting, room, time, predicate: "Schedule", model_id:) = Models();
```

### Getting Optimal Solutions

When using optimization (`shouldbe`), the model with the highest `model_id` contains the optimal solution:

```
OptimalSolution(item) :-
  SelectedItems(item, model_id: Max{m.model_id :- m in Models()});
```

## Adding External Facts

You can augment your ASP program with additional facts using `ClingoFact`:

```
Models() = Clingo(
  ["Item", "Selected", "Overweight"],
  [ClingoFact("Item", ["Flashlight", "1", "10"])]
);
```

## Complete Example: Knapsack Problem

```
@Engine("duckdb", clingo: {time_limit: ∞, models_limit: ∞});

# Items with weight and value
Item("Water", 3, 20);
Item("Food", 2, 15);
Item("Rope", 1, 5);
Item("Flashlight", 1, 10);
Item("Raincoat", 2, 25);

# Maximum weight capacity
MaxWeight(5);

# Choice: which items to select
Selected(item) couldbe :- Item(item, weight, value);

# Constraint: don't exceed weight limit
Overweight() cantbe :-
  Sum{weight :- Selected(item), Item(item, weight, value)} > max_weight,
  MaxWeight(max_weight);

# Optimization: maximize total value
TotalValue(total) :-
  total = Sum{value :- Selected(item), Item(item, weight, value)};

MaxValue() = Max{value :- TotalValue(value)} shouldbe;

# Solve the problem, adding an extra item via additional facts
Problem() = ["Item", "Selected", "Overweight", "MaxWeight", "TotalValue", "MaxValue"];
ExtraFacts() = [ClingoFact("Item", ["Knife", "1", "8"])];
Models() = Clingo(Problem(), ExtraFacts());

# Extract the optimal solution
OptimalItems(item, weight, value) :-
  ExtractClingoCall(item, predicate: "Selected", 
                   model_id: Max{m.model_id :- m in Models()}) = Models(),
  Item(item, weight, value);
```

This integration allows you to leverage the full power of Answer Set Programming within Logica's data processing pipeline, combining constraint satisfaction, optimization, and complex logical reasoning with traditional data analysis workflows.
