
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/project/:id',
        component: () => import('pages/ProjectPage.vue'),
        children: [
          { path: 'info', component: () => import('pages/ProjectInfo.vue') },
          { path: 'list', component: () => import('pages/ProjectList.vue') },
          { path: 'form', component: () => import('pages/ProjectEntryForm') }
        ]
      },
      { path: '/dvojspunt2019', component: () => import('pages/DvojspuntPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
