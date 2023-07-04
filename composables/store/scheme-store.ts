import { defineStore } from "pinia";
import { schemeData } from '~/utility/data/scheme-data.js'
import {get_Arr_Of_ObjectByValue} from '~/utility/util.js'

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
      archiveSchemeMethod: function (selectedScheme: Object) {
        try {
          const index = this.schemaData.findIndex(obj => obj['id'] === selectedScheme['id']);
          console.log(index, "INDEXX")
          if (index !== -1) {
            const archivedScheme:Object = this.schemaData.splice(index, 1)[0];
            this.archivedSchemes.push(archivedScheme)
          }
  
        }
        catch (err) {
          console.log(err)
        }
  
      },
      
      createScheme: function (schemeData: {}) {
        this.schemaData.push(schemeData);
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
  