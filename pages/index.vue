<template>
  <v-row no-gutters align="center" style="min-height: 12vh; border: solid">
    <v-col cols="4" style="
        font-size: xx-large;
        font-weight: bolder;
        text-align: left;
        padding: 0px 0px 0px 10px;
      ">
      Scheme Builder
    </v-col>
    <v-col cols="6">
      <v-list class="v-lllll" flex-direction="col" lines="one" density="compact" variant="flat">
        <v-list-item style="background-color: transparent" v-for="(item, i) in [0, 1, 2, 3, 4, 5, 6]">item</v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-row class="d-flex flex-column">
    <v-card flat style="background-color: transparent">
      <v-tabs v-model="tab" hide-slider selected-class="active-class">
        <v-tab v-for="(tabData, i) in tabsStore.allTabs" :ripple="false" :value="tabData.name" :key="tabData.prop" :class="!['schemeset', 'schemesetting'].includes(tabData.prop)
            ? 'tab-style'
            : ''
          ">
          <template v-slot:default>
            {{ tabData.name }}
            <v-icon append v-if="!['schemeset', 'schemesetting'].includes(tabData.prop)" class="ml-3" :icon="mdiClose"
              @click="handleCloseTab(tabData.prop)"></v-icon>
          </template>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-row style="margin: 20px 0px 0px 4px">scheme > {{ tab }}</v-row>
    <v-window v-model="tab">
      <v-window-item value="Scheme Settings">
        <div class="mt-10">
          SCHEME SETTINGS
        </div>
      </v-window-item>
      <v-window-item value="Scheme Set" id="scheme-set">
        <v-row>
          <v-col cols="3">
            <v-text-field label="Search" density="compact" v-model="schemeStore.searchText"
              style="margin-top: 12px"></v-text-field>
          </v-col>
          <v-col cols="1" align-self="center">
            <v-menu transition="scale-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> Filters </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(filter, i) in filter2" :key="i">
                  <v-list-item-title @click="filterSchmesFunc(filter)">{{
                    filter
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col sm="20" align-self="center" max-with="20px">
            <v-menu transition="scale-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> Categories </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(filter, i) in filter2" :key="i">
                  <v-list-item-title>{{ filter }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col sm="0" cols="3" align-self="center">
            <v-switch label="show archived list" density="compact" style="margin-top: 10px" v-model="archiveState"
              @click="handleArchiveState"></v-switch>
          </v-col>
          <v-col align-self="center">
            <v-btn color="black" :append-icon="mdiAccount" @click="createScheme">Create Scheme</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table :headers="headers" :fixed-header="true" :hide-default-header="true" :items="archiveState
              ? schemeStore.archivedSchemes
              : schemeStore.filteredSchemes
            " :single-select="hover" select-strategy="single" :hover="true" :key="'id'" class="elevation-1">
            <template v-slot:item.data-table-select="{ item }">
            </template>
            <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
              <tr></tr>
            </template>

            <template v-slot:item.displayName="{ item }">
              <div style="display: flex; flex-direction: column">
                <h2>{{ item.raw.displayName }}</h2>
                <span>{{ item.raw.name }}</span>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" :icon="mdiEyeOutline" class="data-table-actions" @click="handleRowClick(item.raw)">
              </v-icon>
              <v-icon size="small" class="data-table-actions" :icon="mdiPencilOutline" @click="editItem(item.raw)">
              </v-icon>
              <v-icon size="small" :icon="mdiContentCopy" class="data-table-actions" @click="copyItem(item.raw)">
              </v-icon>
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-icon size="small" :icon="mdiDotsVertical" class="data-table-actions" v-bind="props">
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item v-for="(filter, i) in archiveState
                    ? archivedDataFilters
                    : filters" :key="i">
                    <v-list-item-title @click="handleMenuActions(item.raw, i)">{{ filter.type }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-dialog v-model="create_team_dialogue" :persistent="true">
            <v-container class="create-team-dialogue">
              <v-row>
                <v-text-field label="Display Name" v-model="createSchemeData.displayName">
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field label="Name" v-model="createSchemeData.name">
                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field label="Type" v-model="createSchemeData.type">
                </v-text-field>
              </v-row>
              <v-row class="d-flex flex-row-reverse">
                <v-col sm="1" cols="1" style="
                      color: black;
                      border-radius: 20px;
                      text-align: center;
                    ">
                  Cancel
                </v-col>
                <v-col @click="createSchemeDialogue" cols="1" style="
                      background-color: black;
                      color: white;
                      border-radius: 20px;
                      text-align: center;
                    ">
                  Save
                </v-col>
              </v-row>
            </v-container>
          </v-dialog>
        </v-row>
      </v-window-item>
      <v-window-item v-for="(tabsData,i) in tabsStore.allTabs" :value="tabsData.name">
          <div>{{ tabsData.name }}</div>
      </v-window-item>
    </v-window>
  </v-row>
</template>

<script setup lang="ts">
import {
  mdiAccount,
  mdiDotsVertical,
  mdiContentCopy,
  mdiClose,
  mdiEyeOutline,
  mdiPencilOutline,
} from "@mdi/js";
import { useTabsStore } from "~/composables/store/index.ts";
import { useSchemeStore } from "~/composables/store/scheme-store.ts";

import { storeToRefs } from "pinia";

const tab = ref(null);
const hover = ref(true);
const tabsStore = useTabsStore();
const schemeStore = useSchemeStore();
const { getFilteredSchemes, searchText, filterSchmesFunc } =
  storeToRefs(schemeStore);
const create_team_dialogue = ref(false);
const selectedRowData = ref({});
const archiveState = ref(false);
const filter2 = ref(["name", "type"]);
const filters = ref([{ type: "displayName" }, { type: "archive" }]);
const archivedDataFilters = ref([{ type: "name" }, { type: "unarchive" }]);
const timeoutId: Ref<Number> = ref(0);
const createSchemeData = reactive({ displayName: "", name: "", type: "" });

const headers = [
  { key: "displayName" },
  { key: "type" },
  { align: "end", key: "actions", sortable: false },
];

watch(searchText, () => {
  clearTimeout(timeoutId.value);
  timeoutId.value = setTimeout(() => {
    schemeStore.searchFunc();
  }, 500);
});

function handleArchiveState() {
  archiveState.value = !archiveState.value;
  console.log(archiveState.value, "TFTFTFTFTTFTF");
}

function createSchemeDialogue() {
  schemeStore.createScheme(createSchemeData);
  create_team_dialogue.value = false;
}

function createScheme() {
  create_team_dialogue.value = true;
}

function handleCloseTab(tabs: String) {
  console.log(tabs, "val hiiiiiiiiiiii");
  tabsStore.removeTabs(tabs);
  tab.value = tabsStore.allTabs[1]['name']
}



function handleRowClick(item: Object) {
  selectedRowData.value = item;
 const tabState=  tabsStore.addTabs({
    name: selectedRowData.value.displayName,
    prop: selectedRowData.value.name,
  });
  console.log(tabState)
if(tabState === 'exists') {
  const tabIndex = tabsStore.allTabs.findIndex(obj => obj['prop'] === selectedRowData.value.name )
  tab.value = tabsStore.allTabs[tabIndex]['name']

}
else {
  tab.value = tabsStore.allTabs[tabsStore.allTabs.length - 1]['name']
}
}

function editItem() { }

function copyItem() { }

function archiveItem(selectedItem: {}) {
  schemeStore.archiveSchemeMethod(selectedItem);
}

function unArchiveItem(selectedItem: {}) {
  schemeStore.unArchiveSchemeMethod(selectedItem);
}
function handleMenuActions(selectedItem: {}, index: Number) {
  // seperating the logic for archived and unarchive filters.
  if (archiveState.value) {
    if (archivedDataFilters.value[index]["type"] === "unarchive") {
      unArchiveItem(selectedItem);
    }
  } else {
    if (filters.value[index]["type"] === "archive") {
      archiveItem(selectedItem);
    } else if (filters.value[index]["type"] === "unarchive") {
      console.log("THIS FUNCTION IS NOT DEFINED");
    }
  }
}

// function selectFilterType(filterType: string) {
//   console.log(filterType,"filter")
//   ;
// }
</script>

<style>
.v-lllll {
  display: flex;
  flex-direction: row;
  background-color: transparent;
}

.active-tab {
  background-color: white;
  color: rgb(56, 56, 66);
  transition: none !important;
}

.active-tab:hover::before {
  background-color: red;
  transition: none !important;
}

.tabs-container {
  background-color: #f5f5f5;
  padding: 0;
  text-decoration: black;
}

.tab-style {
  border-radius: 30px;
}

.active-tab:hover {
  background-color: rgb(255, 255, 255);
  transition: none !important;
}

.data-table-actions {
  margin-right: 15px;
}

.active-class {
  background-color: white;
  border: solid;
  margin-right: 10px;
}

.create-team-dialogue {
  min-width: 30%;
  max-width: 300px;
  min-height: 500px;
  background-color: #f5f5f5;
}
</style>
