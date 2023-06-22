<template>
  <v-app dark>
    <v-navigation-drawer rail  v-model="drawer" :rail="miniVariant" app>
      <v-list nav>
        <v-list-item v-for="(item, i) in items" :key="i" :prepend-icon="item.icon" :title="item.title" :to="item.to">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
        <v-container fluid fill-height>
          <slot />
        </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import {
  mdiAccount, mdiApps,
  mdiChartBubble, mdiChevronLeft,
  mdiChevronRight,
  mdiRepeat
} from "@mdi/js";

import { mapActions } from "pinia";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: mdiApps,
          title: "Welcome",
          to: "/",
        },
        {
          icon: mdiChartBubble,
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      mdiAccount,
      mdiChevronLeft,
      mdiChevronRight,
      mdiRepeat,
      hashParams: { load: "", opener: "" },
    };

  },

 };
</script>
