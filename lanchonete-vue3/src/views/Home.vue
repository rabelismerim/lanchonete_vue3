<script setup>
import ProductCard from "../components/ProductCard.vue";
import ResumoPedido from "../components/ResumoPedido.vue";

defineProps({
  products: { type: Array, required: true },
  selectedProducts: { type: Array, required: true },
  itemCount: { type: Number, required: true },
  total: { type: Number, required: true }
});

const emit = defineEmits(["change-quantity", "continue-order"]);

function updateQuantity(...args) {
  emit("change-quantity", ...args);
}
</script>

<template>
  <div class="home-page">
    <section class="welcome">
      <div>
        <p class="eyebrow">BATEU A FOME?</p>
        <h1>Seu próximo favorito<br /><span>está aqui.</span></h1>
        <p class="welcome-copy">Escolha seus lanches e monte seu pedido do seu jeito.</p>
      </div>
      <div class="welcome-art" aria-hidden="true">
        <span>🍟</span><span>🍔</span><span>🥤</span>
      </div>
      <div class="welcome-tag"><span>★</span> Sabor que dá vontade de repetir</div>
    </section>

    <div class="content-grid">
      <section class="menu-section" aria-labelledby="menu-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">FEITO NA HORA, COM CARINHO</p>
            <h2 id="menu-title">Nosso cardápio</h2>
          </div>
          <span class="menu-count">{{ products.length }} opções</span>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @change-quantity="updateQuantity"
          />
        </div>
      </section>

      <ResumoPedido
        :products="selectedProducts"
        :item-count="itemCount"
        :total="total"
        @continue-order="emit('continue-order')"
      />
    </div>

    <footer class="page-footer">Ponto do Sabor <span>·</span> Feito para matar sua fome.</footer>
  </div>
</template>
