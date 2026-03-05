# Accessing Data

## Overview

Logica rules define how facts are inferred from other facts. But where do the
initial facts come from? In most real programs, data comes from **database
tables** or **files**. This page explains how to bring external data into your
Logica program.

## Database Tables

When Logica encounters a predicate that is not defined anywhere in your
program, it treats it as a **database table** and translates it directly into
a `FROM` clause in the generated SQL.

For example, suppose your database has `metropolies` schema (or dataset as BigQuery calls it) and a table
within it with the full name `metropolies.City`. The table has columns `name` and
`country`. You can use it in a rule just like any other predicate:

```prolog
CapitalCity(name) :- metropolies.City(name:, is_capital: true);
```

Logica will query the `City` table from your database, filtering rows where
`is_capital` is `true`, and return the `name` column.

:::tip
Any unknown predicate is passed through to SQL as a table reference. No
special declaration is needed.
:::

You can combine database tables with conjunctions and disjunctions just as you
would with any other Logica predicate:

```prolog
# Cities that are capitals or have population over 1 million.
BigOrCapital(name) :-
  metropolies.City(name:, is_capital: true) |
  metropolies.City(name:, population:), population > 1000000;
```

## Arbitrary Table Expressions

Sometimes you need to call a **table-valued function** — a function that
returns a table rather than a single value. In SQL these appear in the `FROM`
clause. Logica supports this with the backtick syntax:

```
`(<sql expression>)`
```

The expression inside the backticks is placed directly into the SQL `FROM`
clause. For example, DuckDB's `read_text` function reads a file and returns a
table:

```prolog
FileLines(content) :- `(read_text("data.txt"))`(content:);
```

:::tip
The backtick syntax is a purely syntactic transformation: `` `(expr)`` is
replaced with `expr` in the `FROM` clause. It works the same way on all
supported engines. In fact Logica complier doesn't know if you are using a table of
a table-valued function, it simply places your expression into the SQL.
:::
