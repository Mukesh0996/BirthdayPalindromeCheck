const birthdayDate = document.getElementsByClassName('bday')[0];

const text ="Hello Vishnnu viswanath, I'm really sorry to let you know that you're birthday date isn't a lucky one";

birthdayDate.addEventListener('change', (e) => {
  
   
   extractDate(e.target.value);
})

const totalDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const extractDate = (date) => {
  
   const dateArr = date.split("-");
   const year = dateArr[0];
   const month = dateArr[1];
   const day = dateArr[2];
   console.log(day, month, year);
   const palinDromedate = checkDiffDateCombinations(day, month, year);
   if (palinDromedate) {
     
   } else {
      const [nearestPlaindromeDate, i] = findNearestPalindromeDate(day, month, year);
      const Speech = new SpeechSynthesisUtterance(text); 
      Speech.volume = 1;
      Speech.rate = 1;
      Speech.pitch = 1;
      window.speechSynthesis.speak(Speech);
      console.log(nearestPlaindromeDate, i);
   }
}

const checkDiffDateCombinations = (day, month, year) => {

   const formatOne = day + month + year;
   const formatTwo = day + month + year.split("").slice(2, 4).join("");
   const formatThree = year + month + day;
   console.log(formatOne, formatTwo, formatThree);
   if (isPalindrome(formatOne)) {
      return `${day}-${month}-${year}`
   }
   else if (isPalindrome(formatTwo)) {
      return `${day}-${month}-${year.split("").slice(2, 4).join("")}`
   }
   else if (isPalindrome(formatThree)) {
      return `${year}-${month}-${day}`
   }
   else {
      console.log("not a plindrome");
      return false;
   }

}

const isPalindrome = (date) => {

   let reversedDate = "";
   for (let i = date.length - 1; i >= 0; i--) {
      reversedDate += date[i]
   }

   if (date === reversedDate) {
      return true;
   } else {
      return false;
   }

}

const findNearestPalindromeDate = (day, month, year) => {

   let day1 = Number(day);
   let month1 = Number(month);
   let year1 = Number(year);

   let day2 = Number(day);
   let month2 = Number(month);
   let year2 = Number(year);


   for (let i = 1; i > 0; i++) {
         day1 = day1+1;
      // if days exceeds total days in month, reset day to 1 and add month with 1
      if (day1 > totalDaysInMonth[month1 - 1]) {
         day1 = 1;
         month1 += 1;
      }
      //if month is greater than 12, reset month to 1 and increase the year by 1
      if (month1 > 12) {
         month1 = 1;
         year1 += year1;
      }
      let day1String = day1.toString();
      let month1String = month1.toString();
      let year1String = year1.toString();

      // add 0 in front if date is less than 10;
      if (day1 < 10) {
         day1String = "0" + day1String;
      } 
      if (month1 < 10) {
         month1String = "0" + month1String;
      } 
      console.log("day is", day1String, "month is", month1String, "year is", year1String);
      const palindromeDate = checkDiffDateCombinations(day1String, month1String, year1String);
      if (palindromeDate) {
         return [palindromeDate, i];
      }
   }


}