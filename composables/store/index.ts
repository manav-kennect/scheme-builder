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
    addTabs: function (tabdata: Object) {
      const validateTab = () => {
        for (let item of this.allTabs) {
          if (item.prop === tabdata['prop']) {
            return true
          }
        }
      }
      if (!!validateTab()) {
        return 'exists';
      }
      else {
        this.allTabs.push(tabdata)
        return 'appended'
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