import { AppDataSource } from "../db-config/DbConnection";
import { RateMaster } from "../entities/RateMaster";

const calculateValue = (fat: number, snf: number, rateMaster: any[]): number => {

    //if (snf > 9.0) {
    //  snf = 9.0;
    //}

    let ratePayable = 0;
    let notPayable = false;
    // console.log("Input Fat:", fat, "SNF:", snf);
    for (let i = 0; i < rateMaster.length; i++) {
      const rate = rateMaster[i];

      let fatKgRate = 0;
      let snfKgRate = 0;
      let milkType;
      let isSingleAxis;

      if (fat > 5.4) {
        milkType = "buff";
      } else {
        milkType = "cow";
      }

      // console.log("Milk Type:", milkType);
      // console.log("max fat range--> ",rate.FatRangeMax,)
      // console.log("min fat range--> ",rate.FatRangeMin,)
      if (rate.FatRangeMax !== null) {
        if (fat >= rate.FatRangeMin && fat <= rate.FatRangeMax) {
          // console.log("inside fat >= rate.FatRangeMin && fat <= rate.FatRangeMax condition")
          if (milkType === "cow") {
            // console.log("Fat Rate (Cow):", rate.CowFatRate);
            fatKgRate = rate.CowFatRate;
            // console.log(" fat range max not null, cow fatKgRate = ", fatKgRate);
          } else {
            // console.log("Fat Rate (Buff):", rate.BuffFatRate);
            fatKgRate = rate.BuffFatRate;
            // console.log(" fat range max not null, buff fatKgRate = ", fatKgRate);

          }
        } else {
          // console.log("restarting the loop.")
          continue;
        }
      } else {
        // console.log("fat > min fat range --> ",rate.FatRangeMin,)
        if (fat >= rate.FatRangeMin) {
          if (milkType === "cow") {
            // console.log("Fat Rate (Cow):", rate.CowFatRate);
            fatKgRate = rate.CowFatRate;
            // console.log("fat > minFatRange cow Fatkg", fatKgRate);
          } else {
            // console.log("Fat Rate (Buff):", rate.BuffFatRate);
            fatKgRate = rate.BuffFatRate;
            // console.log("fat > minFatRange buff Fatkg", fatKgRate);
          }
        }
      }

      if (rate.SnfRangeMax !== null) {
        // isSingleAxis = false;
        if (snf >= rate.SnfRangeMin && snf <= rate.SnfRangeMax) {
          if (milkType === "cow") {
            // console.log("SNF Rate (Cow):", rate.CowSnfRate);
            if (rate.CowSnfRate !== null) {
              snfKgRate = rate.CowSnfRate;
            }
            // console.log("snf > minFatRange, cow snfkg", snfKgRate);
          } else {
            // console.log("SNF Rate (Buff):", rate.BuffSnfRate);
            if (rate.BuffSnfRate !== null) {
              snfKgRate = rate.BuffSnfRate;
            }
            // console.log("snf > minFatRange, buff snfkg", snfKgRate);
          }
        }
      } else {
        // isSingleAxis = true;
        if (snf >= rate.SnfRangeMin) {
          if (milkType === "cow") {
            // console.log("SNF Rate (Cow):", rate.CowSnfRate);
            snfKgRate = rate.CowSnfRate;
            // console.log("snf > min snf range, cow snfkg", snfKgRate);
          } else {
            // console.log("SNF Rate (Buff):", rate.BuffSnfRate);
            snfKgRate = rate.BuffSnfRate;
            // console.log("snf > min snf range buff snfkg", snfKgRate);
          }
        }
      }
      // console.log(fatKgRate, snfKgRate)
      if (fatKgRate === 0 && snfKgRate === 0) {
        // console.log("No bill");
        notPayable = true;
        break;
      } else {
        // console.log("going beyond break")
        if (milkType === "cow") {
          if (fat < rate.CowMinFat) {
            // console.log("Fat < CowMinFat. FatKg:", fatKgRate);
            fatKgRate = 0;
          }
          if (snf < rate.CowMinSnf) {
            // console.log("SNF < CowMinSnf. SNF Kg:", snfKgRate);
            snfKgRate = 0;
          }
          if (fat < rate.CowMinFat && snf < rate.CowMinSnf) {
            // console.log("Both Fat and SNF are below minimum");
            fatKgRate = 0;
            snfKgRate = 0;
          }
        }
        if (milkType === "buff") {
          if (fat < rate.BuffMinFat) {
            // console.log("Fat < BuffMinFat. FatKg:", fatKgRate);
            fatKgRate = 0;
          }
          if (snf < rate.BuffMinSnf) {
            // console.log("SNF < BuffMinSnf. SNF Kg:", snfKgRate);
            snfKgRate = 0;
          }
          if (fat < rate.BuffMinFat && snf < rate.BuffMinSnf) {
            // console.log("Both Fat and SNF are below minimum");
            fatKgRate = 0;
            snfKgRate = 0;
          }
        }
      }

      if (rate.CowSnfRate == null && rate.BuffSnfRate == null) {
        isSingleAxis = true;
      } else {
        isSingleAxis = false;
      }
      if (isSingleAxis == true) {
        // console.log("Is Single Axis == true");
        if (snf >= 7.5 && snf <= 9.0) {
          const diffSnf = 9.0 - snf;
          // console.log("snf being deducted--> ", diffSnf.toFixed(2))
          fatKgRate = fatKgRate * ((100 - (0.5 * (diffSnf * 10))) / 100);
          // console.log("fat kg rate --> ", fatKgRate)
        }
      }
      // ratePayable = ((fat / 100) * fatKgRate) + ((snf / 100) * snfKgRate);
      ratePayable = (Math.trunc(fat * fatKgRate) + Math.trunc(snf * snfKgRate)) / 100;

      break;
    }
    if (notPayable) {
      // console.log("retruning 0")
      return 0;
    }
    return ratePayable;
  };

  export { calculateValue }