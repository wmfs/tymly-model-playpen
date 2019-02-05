
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {path: '', redirect: {name: 'drag-and-drop'}},
      { name: 'drag-and-drop', path: 'drag-and-drop', component: () => import('pages/Drag-and-drop.vue') },
      { name: 'text-editor', path: 'text-editor', component: () => import('pages/Text-editor.vue') }
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
