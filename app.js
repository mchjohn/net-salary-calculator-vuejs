new Vue({
  el: '#app',
  data: {
    baseSalary: 0,
    fullSalary: 0,
    netSalary: 0,
    workday: 220,
    overtimeFifty: 0,
    totalOvertimeFifty: 0,
    overtimeHundred: 0,
    totalOvertimeHundred: 0,
    totalOvertimes: 0,
    dependents: 0,
    salaryDependents: 0,
    otherDiscounts: 0,
    hourValue: 0,
    discountInss: 0,
    discountIrrf: 0,
    rangeInss: 0,
    rangeIrrf: 0,
    totalDiscount: 0,
  },
  methods: {
    getHourValue() {
      this.baseSalary = parseFloat(this.baseSalary)
      this.hourValue = (this.baseSalary / this.workday)
      this.totalOvertimeFifty = (this.hourValue + (this.hourValue * 0.5)) * this.overtimeFifty
      this.totalOvertimeHundred = (this.hourValue + (this.hourValue * 1)) * this.overtimeHundred
      this.totalOvertimes = this.totalOvertimeFifty + this.totalOvertimeHundred

      this.getFullSalary()
    },
    getFullSalary() {
      this.fullSalary = this.baseSalary + this.totalOvertimeFifty + this.totalOvertimeHundred

      this.getDiscountInss()
    },
    getDiscountInss() {
      if(this.fullSalary <= 1045) {
        this.rangeInss = "7.5"
        this.discountInss = (this.fullSalary * 0.075)
      } else if(this.fullSalary > 1045 && this.fullSalary <= 2089.60) {
        this.rangeInss = "9"
          this.discountInss = (this.fullSalary * 0.09) - 15.684
      } else if(this.fullSalary > 2089.60 && this.fullSalary <= 3134.40) {
        this.rangeInss = "12"
        this.discountInss = (this.fullSalary * 0.12) - 78.36
      } else if(this.fullSalary > 3134.40 && this.fullSalary <= 6101.06) {
        this.rangeInss = "14"
        this.discountInss = (this.fullSalary * 0.14) - 141.05
      } else if(this.fullSalary > 6101.06) {
        this.discountInss = 713.10
      }

      this.netSalary = this.fullSalary - this.discountInss

      this.getDiscountIrrf()
    },
    getDiscountIrrf() {
      this.salaryDependents = this.netSalary - (this.dependents * 189.59)

      if(this.salaryDependents <= 1903.98) {
        this.rangeIrrf = "0"
        this.discountIrrf = 0
      } else if(this.salaryDependents > 1903.98 && this.salaryDependents <= 2826.65) {
        this.rangeIrrf = "7.5"
        this.discountIrrf = (this.salaryDependents * 0.075) - 142.80
      } else if(this.salaryDependents > 2826.65 && this.salaryDependents <= 3751.05) {
        this.rangeIrrf = "15"
        this.discountIrrf = (this.salaryDependents * 0.15) - 354.80
      } else if(this.salaryDependents > 3751.05 && this.salaryDependents <= 4664.68) {
        this.rangeIrrf = "22.5"
        this.discountIrrf = (this.salaryDependents * 0.225) - 636.13
      } else if(this.salaryDependents > 4664.68) {
        this.rangeIrrf = "27.5"
        this.discountIrrf = (this.salaryDependents * 0.275) - 869.36
      }
      
      this.totalDiscount = (this.discountInss + this.discountIrrf) + parseFloat(this.otherDiscounts)
      this.netSalary = (this.netSalary - this.discountIrrf) - this.otherDiscounts
    },
    somenteNumeros(e) {
      var charCode = e.charCode ? e.charCode : e.keyCode;
      if (charCode != 8) {
        if (charCode < 48 || charCode > 57) {
          return false;
        }
      }
    }
  }
})