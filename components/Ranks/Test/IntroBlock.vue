<script setup lang="ts">
import type { RanksOptions } from '~/assets/types/rank';

const props = defineProps({
  ranksType: {
    type: String as PropType<RanksOptions['type']>,
    default: 'general'
  }
});

const emit = defineEmits(['startTest', 'updateRanksType']);
</script>

<template>
  <div class="rank-test-intro">
    <p>Šī testa mērķis ir palīdzēt kandidātam iemācīties atšķirt NBS dienesta pakāpes.</p>
    <div class="test-options">
      <div class="select-container">
        <label for="ranks-type" class="select-container-label">Pakāpju veids</label>
        <select 
          :value="props.ranksType" 
          name="ranks-type" 
          id="ranks-type"
          @change="$emit('updateRanksType', ($event?.target as HTMLSelectElement)?.value as RanksOptions['type'])"
          >
          <option value="general">Vispārējās</option>
          <option value="navy">Jūras spēku</option>
        </select>
      </div>
    </div>
    <input class="button" type="button" value="Sākt" accesskey="enter" @click="$emit('startTest')"/>
  </div>
</template>

<style>
.test-options {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 1rem;
}
</style>