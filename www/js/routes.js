const beforeEnter = async ({resolve, reject, router}) => {
	// 現在ログインしているユーザー情報を取得
	const currentUser = ncmb.User.getCurrentUser();
	// 認証していない場合はnullになる
	if (!currentUser) {
		// rejectを実行
		reject();
		// 認証画面に遷移
		router.navigate('/auth');
		// 処理完了
		return;
	}
	try {
		// データストアにダミーアクセス
		await ncmb.DataStore('Hello').fetch();
		// アクセスできればresolveを実行（ /settingsを表示）
		resolve();
	} catch (e) {
		// 駄目だった場合は認証情報を削除
		localStorage.removeItem("NCMB/"+ncmb.apikey+"/currentUser");
		// rejectを実行
		reject();
		// 認証画面に遷移
		router.navigate('/auth');
	}
};

const routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/auth',
    componentUrl: './pages/auth.html',
  },
  {
    path: '/settings',
    componentUrl: './pages/settings.html',
    beforeEnter,
  },
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
