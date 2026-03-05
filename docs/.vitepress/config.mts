import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Logica",
  description: "Logic Programming Language for Data Analysis",
  head: [['link', { rel: 'icon', href: '/logica_favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logica_logo.png',
      dark: '/logica_logo.png',
      alt: 'logica logo'
    },
    footer: {
      message: '',
      copyright: 'Released under the Apache 2.0 License. Copyright © 2024-present <a href="https://github.com/logica-web/logica-web.github.io" style="text-decoration: underline;">Logica Devs</a>'
    },
    siteTitle: false,
    nav: [
      { text: 'Getting Started', link: '/start/' },
      { text: 'User Guide', link: '/usrguide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Logica+AI', link: '/logica-ai/' },
      { text: 'Publications', link: '/publications/' },
      {
        text: 'More',
        items: [
          { text: 'Community', link: '/community/' },
          { text: 'Contributing', link: '/contributing/' }
        ]
      },
      { text: 'Playground', link: 'https://logica.dev/sandbox.html' },
    ],

    sidebar: {
      // Getting Started part
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Logica', link: '/start/' },
            { text: 'Why is Logica', link: '/start/start-why-is-logica' },
          ]
        },
      ],
      '/publications/': [
        {
          // text: 'Publications',
          items: [
            { text: 'Publication List', link: '/publications/' },
            { text: 'Research Team', link: '/publications/research-team' },
          ]
        }
      ],
      '/usrguide/': [
        {
          text: 'User Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/usrguide/' },
          ]
        },
        {
          text: 'Logica Execution',
          collapsed: false,
          items: [
            { text: 'Logica Installation', link: '/usrguide/installation' },
            { text: 'Query Engine', link: '/usrguide/query-engine' },
            { text: 'Run in Terminal', link: '/usrguide/run-in-terminal' },
            { text: 'Run in Notebook', link: '/usrguide/run-in-notebook' },
          ]
        },
        {
          text: 'Logica Basic',
          collapsed: false,
          items: [
            { text: 'Facts', link: '/usrguide/facts' },
            { text: 'Rules', link: '/usrguide/rules' },
            { text: 'Value Types', link: '/usrguide/value-types' },
            { text: 'Basic Operations', link: '/usrguide/basic-operators' },
            { text: 'Named Arguments', link: '/usrguide/named-arguments' },
            { text: 'Multiset Semantics', link: '/usrguide/multi-semantics' },
            { text: 'Data Access', link: '/usrguide/data_access' },
          ]
        },
        {
          text: 'Logica Advanced',
          collapsed: false,
          items: [
            { text: 'Aggregation', link: '/usrguide/aggregation' },
            { text: 'Negation', link: '/usrguide/negation' },
            { text: 'Recursion', link: '/usrguide/recursion' },
            { text: 'Functions', link: '/usrguide/functions' },
            { text: 'Boolean Logic', link: '/usrguide/boolean-logic' },
            { text: 'Functional Notation', link: '/usrguide/notation' },
            { text: 'Answer Set Programming', link: '/usrguide/asp' },
            { text: 'Functors', link: '/usrguide/functors' },
          ]
        },
        {
          text: 'Logica Cheatsheet',
          collapsed: false,
          items: [
            { text: 'Build-In Operators', link: '/usrguide/built-in-operators' },
            { text: 'Imperatives', link: '/usrguide/imperatives' },
          ]
        }
      ],

      // examples
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
          ]
        },
        {
          text: 'Recursive Queries',
          items: [
            { text: 'Transitive Closure', link: '/examples/tc' },
            { text: 'Same Generation', link: '/examples/sg' },
          ]
        },
        {
          text: ' Aggregation Queries',
          items: [
            { text: 'Triangle Counting', link: '/examples/triangle' },
          ]
        },
        {
          text: ' Aggregation in Recursion',
          items: [
            { text: 'Single Shortest Path', link: '/examples/sssp' },
          ]
        },
      ],
      // logica-ai
      '/logica-ai/': [
        {
          text: 'Logica + AI',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/logica-ai/' },
          ]
        },
        {
          text: 'LogicLM',
          collapsed: false,
          items: [
            { text: 'LogicLM', link: '/logica-ai/logiclm' },
          ]
        },
        {
          text: 'NL2SQL',
          collapsed: false,
          items: [
            { text: 'NL2SQL', link: '/logica-ai/nl2sql' },
          ]
        },
        {
          text: 'NeSy',
          collapsed: false,
          items: [
            { text: 'NeSy', link: '/logica-ai/nesy' },
          ]
        }
      ],
      // api
      // '/api/': [
      //   {
      //     text: 'API',
      //     items: [
      //       { text: 'API', link: '/api' },
      //     ]
      //   }
      // ],
      // community
      '/community/': [
        // {
        //   text: 'Community',
        //   items: [
        //     { text: 'Community', link: '/community' },
        //   ]
        // }
      ],
      // contribution
      '/contributing/': [
        // {
        //   text: 'Contributing',
        //   items: [
        //     { text: 'contributing', link: '/contributing' },
        //   ]
        // }
      ],
    },
    search: {
      provider: "local"
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/evgskv/logica' },
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Playground</title><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm-1.5 15V7l6 5z"/></svg>'
      //   },
      //   link: 'https://logica.dev/sandbox.html',
      //   ariaLabel: 'Playground'
      // }
    ]
  }
})
