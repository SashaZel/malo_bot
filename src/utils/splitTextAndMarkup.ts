export function splitTextAndMarkup(answer: string): { text: string, markup: string} {
  
  //console.log(answer);

  const splitAnswer = answer.split("??reply_markup=");
  if (splitAnswer.length === 1) {
    return { text: splitAnswer[0], markup: "" };
  }
  if (splitAnswer.length === 2) {
    return { text: splitAnswer[0], markup: splitAnswer[1] };
  }
  return { text: "", markup: "" };
}