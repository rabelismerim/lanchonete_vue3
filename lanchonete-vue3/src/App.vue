<script setup>
import { computed, ref } from "vue";
import Home from "./views/Home.vue";
import ConfirmarPedido from "./views/ConfirmarPedido.vue";
import { products as menu } from "./data/products.js";

const products = ref(menu.map((product) => ({ ...product, quantity: 0 })));
const currentScreen = ref("home");
const orderConfirmed = ref(false);
const customerName = ref("");
const orderCode = ref("");

const selectedProducts = computed(() =>
  products.value.filter((product) => product.quantity > 0)
);

const itemCount = computed(() =>
  selectedProducts.value.reduce((count, product) => count + product.quantity, 0)
);

const total = computed(() =>
  selectedProducts.value.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )
);

function changeQuantity(productId, amount) {
  const product = products.value.find((item) => item.id === productId);
  if (!product) return;

  product.quantity = Math.max(0, product.quantity + amount);
}

function continueOrder() {
  if (!selectedProducts.value.length) return;

  orderConfirmed.value = false;
  currentScreen.value = "checkout";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function confirmOrder(name) {
  customerName.value = name;
  orderCode.value = String(Math.floor(1000 + Math.random() * 9000));
  orderConfirmed.value = true;
}

function startNewOrder() {
  products.value.forEach((product) => {
    product.quantity = 0;
  });
  customerName.value = "";
  orderCode.value = "";
  orderConfirmed.value = false;
  currentScreen.value = "home";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <header class="topbar">
    <a class="brand" href="#inicio" aria-label="Ponto do Sabor, início">
      <span class="brand-mark" aria-hidden="true">🍔</span>
      <span class="brand-copy">
        <strong>PONTO DO SABOR</strong>
        <small>LANCHES FEITOS NA HORA</small>
      </span>
    </a>

    <div class="store-status">
      <span class="status-dot"></span>
      Aberto agora <span class="status-divider">·</span> Retirada no balcão
    </div>

    <button
      v-if="currentScreen === 'checkout' && !orderConfirmed"
      class="topbar-order back-link"
      type="button"
      @click="currentScreen = 'home'"
    >
      ← Voltar ao cardápio
    </button>
    <a v-else-if="currentScreen === 'home'" class="topbar-order" href="#pedido">
      Meu pedido <span>{{ itemCount }}</span>
    </a>
    <div v-else class="topbar-order confirmed-order-label">
      Pedido #{{ orderCode }}
    </div>
  </header>

  <main id="inicio" class="page-shell">
    <Home
      v-if="currentScreen === 'home'"
      :products="products"
      :selected-products="selectedProducts"
      :item-count="itemCount"
      :total="total"
      @change-quantity="changeQuantity"
      @continue-order="continueOrder"
    />

    <ConfirmarPedido
      v-else
      :products="selectedProducts"
      :total="total"
      :order-confirmed="orderConfirmed"
      :customer-name="customerName"
      :order-code="orderCode"
      @back="currentScreen = 'home'"
      @confirm="confirmOrder"
      @new-order="startNewOrder"
    />
  </main>
</template>
