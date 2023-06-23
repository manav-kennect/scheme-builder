import { filter } from "cypress/types/bluebird";
import { defineStore } from "pinia";
import { schemeData } from '~/utility/data/scheme-data.js'
import {get_Arr_Of_ObjectByValue} from '~/utility/util.js'
let initialState = {
  // all these properties will have their type inferred automatically

};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTabsStore = defineStore("tabs", {
  state: () => {
    return { allTabs: [{ name: "Scheme Settings", prop: "schemesetting" }, { name: "Scheme Set", prop: "schemeset" }] }
  },

  getters: {
    // use getters like computed properties
    getTabs: (state) => {
      return state.allTabs
    }
  },

  actions: {
    // use actions just like methods but async
    addTabs: function (tabdata: {}) {
      const validateTab = () => {
        for (let item of this.allTabs) {
          if (item.prop === tabdata['prop']) {
            return true
          }
        }
      }
      if (!!validateTab()) {
        alert("Tab Open")
      }
      else {
        this.allTabs.push(tabdata)
      }
    },
    removeTabs: function (tabValue: String) {
      console.log(tabValue, "PINIA")
      // this.allTabs.splice(this.allTabs.indexOf(index), 1)
      try {
        const index = this.allTabs.findIndex(obj => obj['prop'] === tabValue);
        console.log(index, "INDEXX")
        if (index !== -1) {
          this.allTabs.splice(index, 1)[0];
        }
        console.log("here")

      }
      catch (err) {
        console.log(err)
      }
    }
  }

})

export const useSchemeStore = defineStore('schemes', {
  state: () => {
    return { schemaData: schemeData, archivedSchemes: [], filteredSchemes: schemeData, searchText: "",schemaDataKeys: ["displayName","name","type"],schemeFilter: '' }
  },

  getters: {
    getFilteredSchemes: (state) => {
      state.filteredSchemes = state.schemaData
      return state.filteredSchemes
    },
    filterSchmesFunc: (state) => {
      return (filterType: string) => { 
        console.log(filterType)
        state.filteredSchemes.sort((a, b) => {
          const filtertypeA = a[filterType].toLowerCase();
          const filtertypeB = b[filterType].toLowerCase();
        
          if (filtertypeA < filtertypeB) {
            return -1; // nameA comes before nameB
          }
          if (filtertypeA > filtertypeB) {
            return 1; // nameA comes after nameB
          }
          return 0; // names are equal
        });
        return null;
      };
    }
  },

  actions: {
    archiveSchemeMethod: function (selectedScheme: {}) {
      try {
        const index = this.schemaData.findIndex(obj => obj['id'] === selectedScheme['id']);
        console.log(index, "INDEXX")
        if (index !== -1) {
          const archivedScheme = this.schemaData.splice(index, 1)[0];
          this.archivedSchemes.push(archivedScheme)
        }

      }
      catch (err) {
        console.log(err)
      }

    },
    unArchiveSchemeMethod: function (selectedScheme: {}) {
      try {
        const index = this.archivedSchemes.findIndex(obj => obj['id'] === selectedScheme['id']);
        console.log(index, "INDEXX")
        if (index !== -1) {
          const unArchivedScheme = this.archivedSchemes.splice(index, 1)[0];
          this.schemaData.push(unArchivedScheme)
        }
      }
      catch (err) {
        console.log(err)
      }
    },

    searchFunc: function () {
      if (this.searchText.length === 0) {
        this.filteredSchemes = this.schemaData;
      }
      else {
        this.filteredSchemes = []
        const searchValArray = this.searchText.split(" ")
        // console.log(searchValArray)
        this.schemaDataKeys.map(item => {
          searchValArray.map(searchparam => {
            if (this.filteredSchemes.length != 0) {
              if (searchparam) {
                const filterdata = get_Arr_Of_ObjectByValue(this.filteredSchemes, item, searchparam)
                if (filterdata.length !== 0) {
                  this.filteredSchemes = filterdata
                }
              }
            }
            else {
              if (searchparam) {
                const filterdata = get_Arr_Of_ObjectByValue(this.schemaData, item, searchparam)
                console.log("FIRST")
                if (filterdata.length !== 0) {
                  this.filteredSchemes = filterdata
                }
                console.log(this.filteredSchemes,"INSIDE PINIA FILTERSES LIST")
              }
            }

          })

        })
      }
    },
    schemeFilterType: function(filterType) {
      this.schemeFilter = filterType;
    }
  }
})
