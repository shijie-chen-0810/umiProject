export default [
  {
    path: '/',
    component: './../layouts/index.tsx',
    routes: [
      {
        path: '/hero',
        exact: true,
        component: './hero/index.tsx',
      },
      {
        path: '/hero/detail',
        exact: true,
        component: './hero/detail/index.tsx',
      },
      {
        path: '/projectInfo',
        exact: true,
        component: './projectInfo/index.tsx',
      },
      {
        path: '/skill',
        exact: true,
        component: './skill/index.tsx',
      },
      {
        path: '/item',
        routes: [
          {
            path: '/item',
            exact: true,
            component: './item/index.tsx',
          },
        ],
        component: './item/_layout.tsx',
      },
    ],
  },
  {
    path: '/',
    component: './../layouts/index.tsx',
  },
];
