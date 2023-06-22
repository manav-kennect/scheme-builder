export function get_Arr_Of_ObjectByValue(arr, key, value) {
    let result = []
    let pattern = new RegExp(`^${value}`, "i")
    arr.map(obj=>{
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (prop === key) {
              const match = pattern.test(String(obj[prop]))
              if(match){
              result.push(obj)
              }
            } 
          }
        }})
    
        return result
  }