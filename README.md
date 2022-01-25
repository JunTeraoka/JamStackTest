# Next.js Headless WordPress Getting Started Example

## 設定

以下のステップでできない場合，[こちら](https://github.com/wpengine/faustjs#quick-start) から詳細を確認してください

### WordPressにプラグインをインストール

インストールするプラグイン
- WPGraphQL ([URL](https://wordpress.org/plugins/wp-graphql/))
- FaustWP ([URL](https://wordpress.org/plugins/faustwp/))

### .envの設定

`.env.sample`に従って，`.env`ファイルを作成

```
# WordPressサイトのURL
NEXT_PUBLIC_WORDPRESS_URL=http://your-wordpress-site.com

# WordPressのHeadless設定のSecret Key（管理画面->設定->Headless）
FAUSTWP_SECRET_KEY=YOUR_PLUGIN_SECRET
```

### GQtyの設定

1. GraphQLの設定（管理画面->GraphQL->Settings）から，一番下のEnable Public Introspectionにチェックを入れる

1. `npm run generate`を実行

1. 1のEnable Public Introspectionのチェックを外す 

## 実行

```bash
npm install
npm run dev
```

[http://localhost:3000]()
