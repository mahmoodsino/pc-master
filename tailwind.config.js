module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm":"350px",
        "md":"768px",
        "lg":"1024px",
        "xl":"1280px",
        "2xl":"1536px"
      },
      fontFamily:{
        newFont: ['Poppins'],
        salsa:['Salsa']
      },
      colors:{
        green:{
          950:'#02A91C',
          1000:"#015F0F",
          1050:"#00FF28",
          1100:"#037E15"
        },
        gray:{
          950:"#272727",
          1000:"#CDCDCD",
          1050:"#262626",
          1100:'#8A8A8A',
          1150:"#22262A",
          1200:"#777777",
          1250:"#373737",
          1300:"#232323",
          1350:"#F8F8F8",
          1400:"#C4C4C4",
          1450:"#212121",
          1500:"#E5E5E5",
          1550:"#CCCCCC",
          1600:"#ECECEC",
          1650:"#818181",
          1700:"#3A3A3A"
        },
        red:{
          950:"#FF291B",
          1000:"#D70000"
        }
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}