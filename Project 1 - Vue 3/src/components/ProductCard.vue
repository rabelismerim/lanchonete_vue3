<script setup>
import { formatPrice } from "../utils/formatPrice.js";

defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["change-quantity"]);
</script>

<template>
  <article class="product-card" :class="{ selected: product.quantity > 0 }">
    <span v-if="product.quantity > 0" class="selected-mark" aria-label="Adicionado">
      ✓
    </span>
    <div class="product-photo">
      <img :src="product.photo" :alt="product.name" loading="lazy" />
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-bottom">
        <strong class="product-price">{{ formatPrice(product.price) }}</strong>
        <div v-if="product.quantity > 0" class="quantity-control">
          <button
            type="button"
            :aria-label="`Diminuir quantidade de ${product.name}`"
            @click="emit('change-quantity', product.id, -1)"
          >
            −
          </button>
          <span>{{ product.quantity }}</span>
          <button
            type="button"
            :aria-label="`Aumentar quantidade de ${product.name}`"
            @click="emit('change-quantity', product.id, 1)"
          >
            +
          </button>
        </div>
        <button
          v-else
          class="add-button"
          type="button"
          @click="emit('change-quantity', product.id, 1)"
        >
          Adicionar <span>+</span>
        </button>
      </div>
    </div>
  </article>
</template>
