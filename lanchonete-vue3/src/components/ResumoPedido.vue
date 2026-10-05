<script setup>
import { formatPrice } from "../utils/formatPrice.js";

defineProps({
  products: { type: Array, required: true },
  itemCount: { type: Number, required: true },
  total: { type: Number, required: true }
});

const emit = defineEmits(["continue-order"]);
</script>

<template>
  <aside id="pedido" class="order-card" aria-labelledby="order-title">
    <div class="order-heading">
      <div class="cart-icon" aria-hidden="true">🛍️</div>
      <div>
        <p class="eyebrow">JÁ ESCOLHEU?</p>
        <h2 id="order-title">Seu pedido</h2>
      </div>
      <span class="order-count">{{ itemCount }}</span>
    </div>

    <div v-if="products.length" class="order-lines">
      <div v-for="product in products" :key="product.id" class="order-line">
        <div>
          <span class="line-quantity">{{ product.quantity }}×</span>
          <span>{{ product.name }}</span>
        </div>
        <strong>{{ formatPrice(product.price * product.quantity) }}</strong>
      </div>
    </div>
    <div v-else class="empty-order">
      <span aria-hidden="true">🍽️</span>
      <strong>Seu pedido está vazio</strong>
      <p>Adicione seus favoritos pelo cardápio.</p>
    </div>

    <div class="order-total">
      <span>Total</span>
      <strong>{{ formatPrice(total) }}</strong>
    </div>
    <button
      class="checkout-button"
      type="button"
      :disabled="!products.length"
      @click="emit('continue-order')"
    >
      Continuar pedido <span aria-hidden="true">→</span>
    </button>
    <p class="order-footnote">Pagamento realizado no balcão</p>
  </aside>
</template>
