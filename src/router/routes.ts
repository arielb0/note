const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'create',
        component: () => import('pages/CreateNote.vue'),
        name: 'createNote',
      },
      {
        path: ':id/update',
        component: () => import('pages/UpdateNote.vue'),
        name: 'updateNote',
      },
      {
        path: '',
        component: () => import('pages/ListNotes.vue'),
        name: 'listNotes',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
