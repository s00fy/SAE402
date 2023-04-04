// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        newList: resolve(__dirname, "./pages/storage/new.html"),
        editList: resolve(__dirname, "./pages/edit/edit.html"),
        favShop: resolve(__dirname, "./pages/favShop/favoriteShop.html"),
        parameters: resolve(__dirname, "./pages/parameters/parameters.html"),
        shop: resolve(__dirname, "./pages/shop/shop.html"),
        fallback: resolve(__dirname, "./pages/fallback/fallback.html"),
      },
    },
  },
});
