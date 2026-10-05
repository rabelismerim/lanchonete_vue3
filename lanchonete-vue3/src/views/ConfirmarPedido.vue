<script setup>
import { ref } from "vue";
import { formatPrice } from "../utils/formatPrice.js";

defineProps({
  products: { type: Array, required: true },
  total: { type: Number, required: true },
  orderConfirmed: { type: Boolean, required: true },
  customerName: { type: String, required: true },
  orderCode: { type: String, required: true }
});

const emit = defineEmits(["back", "confirm", "new-order"]);
const customerNameInput = ref("");

function submitOrder() {
  const name = customerNameInput.value.trim();
  if (name) emit("confirm", name);
}
</script>

<template>
  <section class="checkout-page" aria-labelledby="checkout-title">
    <template v-if="!orderConfirmed">
      <button class="back-button" type="button" @click="emit('back')">← Voltar ao cardápio</button>
      <div class="checkout-heading">
        <p class="eyebrow">SÓ MAIS UM PASSO</p>
        <h1 id="checkout-title">Revise seu pedido</h1>
        <p>Confira os itens e informe um nome para identificar o pedido no balcão.</p>
      </div>

      <div class="checkout-layout">
        <section class="checkout-card" aria-label="Itens do pedido">
          <h2>Itens escolhidos <span>{{ products.length }}</span></h2>
          <div class="review-lines">
            <div v-for="product in products" :key="product.id" class="review-line">
              <img :src="product.photo" :alt="''" />
              <div class="review-product">
                <strong>{{ product.name }}</strong>
                <span>{{ product.quantity }} unidade(s) · {{ formatPrice(product.price) }}</span>
              </div>
              <b>{{ formatPrice(product.price * product.quantity) }}</b>
            </div>
          </div>
          <div class="review-total">
            <span>Total a pagar no balcão</span>
            <strong>{{ formatPrice(total) }}</strong>
          </div>
        </section>

        <form class="checkout-card customer-card" @submit.prevent="submitOrder">
          <div class="form-icon" aria-hidden="true">🧾</div>
          <h2>Quem vai retirar?</h2>
          <p>Use um nome curto para localizar o pedido no balcão.</p>
          <label for="customer-name">Nome para identificar o pedido</label>
          <input
            id="customer-name"
            v-model="customerNameInput"
            class="name-input"
            type="text"
            autocomplete="name"
            placeholder="Ex.: Ana"
            maxlength="40"
            required
          />
          <button class="checkout-button confirm-button" type="submit">
            Confirmar pedido <span aria-hidden="true">→</span>
          </button>
          <p class="order-footnote">O pagamento é feito no balcão.</p>
        </form>
      </div>
    </template>

    <section v-else class="confirmation-card" aria-labelledby="checkout-title">
      <div class="success-icon" aria-hidden="true">✓</div>
      <p class="eyebrow">PEDIDO REGISTRADO</p>
      <h1 id="checkout-title">Obrigado, {{ customerName }}!</h1>
      <p class="confirmation-copy">
        Seu pedido <strong>#{{ orderCode }}</strong> foi confirmado nesta demonstração.
        Apresente o número no balcão e faça o pagamento por lá.
      </p>
      <div class="confirmation-items" aria-label="Itens confirmados">
        <div v-for="product in products" :key="product.id" class="confirmation-item">
          <span><b>{{ product.quantity }}×</b> {{ product.name }}</span>
          <strong>{{ formatPrice(product.price * product.quantity) }}</strong>
        </div>
      </div>
      <div class="confirmed-total">
        <span>Total do pedido</span>
        <strong>{{ formatPrice(total) }}</strong>
      </div>
      <button class="checkout-button confirm-button" type="button" @click="emit('new-order')">
        Fazer novo pedido <span aria-hidden="true">↻</span>
      </button>
    </section>
  </section>
</template>
