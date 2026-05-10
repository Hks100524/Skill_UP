const rotate = (items, shift) => {
  const safeShift = ((shift % items.length) + items.length) % items.length;
  return items.slice(safeShift).concat(items.slice(0, safeShift));
};

const unique = (items) => [...new Set(items)];

const formatNumber = (value) => {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return Number.parseFloat(value.toFixed(2)).toString();
};

const makeQuestion = ({
  category,
  group,
  topic,
  question,
  options,
  correctAnswer,
  explanation,
  difficulty,
}) => ({
  category,
  group,
  topic,
  question,
  options,
  correctAnswer,
  explanation,
  difficulty,
});

const buildNumericOptions = (answer, index) => {
  const value = Number(answer);
  const spread = Math.max(2, Math.round(Math.abs(value) * 0.1) || 2);
  const rawOptions = [
    value - 2 * spread,
    value - spread,
    value + spread,
    value + 2 * spread,
  ];

  const options = unique([value, ...rawOptions]).filter((item) => item !== undefined);
  while (options.length < 4) {
    options.push(value + spread * options.length);
  }

  return rotate(options.slice(0, 4).map(formatNumber), index % 4);
};

const buildStringOptions = (answer, distractors, index) =>
  rotate(unique([answer, ...distractors]).slice(0, 4), index % 4);

const buildTopicQuestions = (meta, specs, useStrings = false) =>
  specs.map((spec, index) =>
    makeQuestion({
      ...meta,
      question: spec.question,
      options: spec.options
        ? rotate(unique(spec.options).slice(0, 4), index % 4)
        : typeof spec.answer === "string"
          ? buildStringOptions(spec.answer, spec.distractors || [], index)
          : buildNumericOptions(spec.answer, index),
      correctAnswer: spec.correctAnswer ?? spec.answer,
      explanation: spec.explanation,
      difficulty: spec.difficulty,
    }),
  );

const quantitative = [];

const arithmeticMeta = { category: "quantitative", group: "Arithmetic" };
const timeBasedMeta = { category: "quantitative", group: "Time Based" };
const algebraMeta = { category: "quantitative", group: "Algebra + Number" };
const diMeta = { category: "quantitative", group: "Data Interpretation" };

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "percentage" },
    [
      {
        question: "What is 25% of 240?",
        answer: 60,
        explanation: "25% means one-fourth. One-fourth of 240 is 60.",
        difficulty: "easy",
      },
      {
        question: "A number is increased by 20% to become 360. What was the original number?",
        answer: 300,
        explanation: "If original number is x, then 1.2x = 360, so x = 300.",
        difficulty: "medium",
      },
      {
        question: "What is 15% of 80% of 500?",
        answer: 60,
        explanation: "80% of 500 is 400 and 15% of 400 is 60.",
        difficulty: "medium",
      },
      {
        question: "If 30% of x is 90, what is x?",
        answer: 300,
        explanation: "30% of x = 90 means x = 90 / 0.30 = 300.",
        difficulty: "easy",
      },
      {
        question: "A shopkeeper marks an item 40% above cost price and gives a 10% discount. What is the profit percentage?",
        answer: "26%",
        options: ["20%", "24%", "26%", "28%"],
        correctAnswer: "26%",
        explanation: "Take cost price as 100. Marked price becomes 140 and after 10% discount, selling price is 126. Profit = 26%.",
        difficulty: "hard",
      },
      {
        question: "60 is what percent of 150?",
        answer: "40%",
        options: ["35%", "40%", "45%", "50%"],
        correctAnswer: "40%",
        explanation: "60 / 150 = 0.4, which is 40%.",
        difficulty: "easy",
      },
      {
        question: "A salary is reduced by 10% and then increased by 10%. What is the net change?",
        answer: "1% decrease",
        options: ["No change", "1% decrease", "1% increase", "2% decrease"],
        correctAnswer: "1% decrease",
        explanation: "After 10% decrease, 100 becomes 90. A 10% increase on 90 gives 99, so the net change is 1% decrease.",
        difficulty: "medium",
      },
      {
        question: "If 20% of A = 30% of B, what is the ratio A:B?",
        answer: "3:2",
        options: ["2:3", "3:2", "4:3", "5:2"],
        correctAnswer: "3:2",
        explanation: "0.2A = 0.3B, so A/B = 0.3/0.2 = 3/2.",
        difficulty: "medium",
      },
      {
        question: "A number is 40% greater than 150. What is the number?",
        answer: 210,
        explanation: "40% of 150 is 60. Add it to 150 to get 210.",
        difficulty: "easy",
      },
      {
        question: "If 12.5% of a number is 36, what is the number?",
        answer: 288,
        explanation: "12.5% is one-eighth, so the number is 36 × 8 = 288.",
        difficulty: "medium",
      },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "profitLoss" },
    [
      {
        question: "A shopkeeper buys a shirt for 800 and sells it for 920. What is the profit percentage?",
        answer: 15,
        explanation: "Profit = 920 - 800 = 120. Profit percentage = 120/800 × 100 = 15%.",
        difficulty: "easy",
      },
      {
        question: "An article is sold at a loss of 10% for 540. What was the cost price?",
        answer: 600,
        explanation: "If SP is 90% of CP, then CP = 540 / 0.9 = 600.",
        difficulty: "medium",
      },
      {
        question: "A shopkeeper marks an item 25% above cost price and gives a 10% discount. What is the profit percentage?",
        answer: 12.5,
        explanation: "Take CP as 100. Marked price = 125, selling price = 112.5, so profit = 12.5%.",
        difficulty: "medium",
      },
      {
        question: "An article sold for 1,200 gives a profit of 20%. What is the cost price?",
        answer: 1000,
        explanation: "SP = 120% of CP, so CP = 1200 / 1.2 = 1000.",
        difficulty: "easy",
      },
      {
        question: "Two successive discounts of 10% and 20% are given on a marked price of 2,000. What is the selling price?",
        answer: 1440,
        explanation: "After 10% discount, price becomes 1800. After 20% more, it becomes 1440.",
        difficulty: "hard",
      },
      {
        question: "A trader sells an item at 5% loss for 950. What was the cost price?",
        answer: 1000,
        explanation: "SP = 95% of CP, so CP = 950 / 0.95 = 1000.",
        difficulty: "easy",
      },
      {
        question: "A product is bought for 1,500 and sold for 1,650. What is the gain percentage?",
        answer: 10,
        explanation: "Profit = 150. Gain percentage = 150 / 1500 × 100 = 10%.",
        difficulty: "easy",
      },
      {
        question: "An item is marked at 30% above cost price and sold at a discount of 15%. What is the overall profit percentage?",
        answer: 10.5,
        explanation: "Assume CP = 100. Marked price = 130, selling price = 110.5, profit = 10.5%.",
        difficulty: "hard",
      },
      {
        question: "A shopkeeper gains 25% by selling an item for 1,250. What was the cost price?",
        answer: 1000,
        explanation: "SP = 125% of CP, so CP = 1250 / 1.25 = 1000.",
        difficulty: "medium",
      },
      {
        question: "If cost price is 900 and selling price is 810, what is the loss percentage?",
        answer: 10,
        explanation: "Loss = 900 - 810 = 90. Loss percentage = 90/900 × 100 = 10%.",
        difficulty: "easy",
      },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "simple-interest" },
    [
      { question: "Find the simple interest on 5,000 at 8% per annum for 2 years.", answer: 800, explanation: "SI = PRT/100 = 5000 × 8 × 2 / 100 = 800.", difficulty: "easy" },
      { question: "A sum of 6,000 amounts to 7,800 at simple interest in 3 years. What is the rate?", answer: 10, explanation: "SI = 1800. Rate = SI × 100 / (P × T) = 1800 × 100 / (6000 × 3) = 10%.", difficulty: "medium" },
      { question: "What principal will earn 1,200 as simple interest in 4 years at 6% p.a.?", answer: 5000, explanation: "P = SI × 100 / (R × T) = 1200 × 100 / (6 × 4) = 5000.", difficulty: "medium" },
      { question: "How much time will 2,400 earn simple interest of 360 at 5% p.a.?", answer: 3, explanation: "T = SI × 100 / (P × R) = 360 × 100 / (2400 × 5) = 3 years.", difficulty: "easy" },
      { question: "What is the amount on 8,000 at 5% simple interest for 2 years?", answer: 8800, explanation: "SI = 8000 × 5 × 2 / 100 = 800. Amount = 8800.", difficulty: "easy" },
      { question: "If simple interest on a sum at 12% for 5 years is 3,600, what is the sum?", answer: 6000, explanation: "P = 3600 × 100 / (12 × 5) = 6000.", difficulty: "medium" },
      { question: "A sum doubles itself in 8 years under simple interest. What is the rate?", answer: 12.5, explanation: "Interest equals principal in 8 years. Rate = 100 / 8 = 12.5%.", difficulty: "hard" },
      { question: "What is the simple interest on 9,000 at 7% per annum for 4 years?", answer: 2520, explanation: "SI = 9000 × 7 × 4 / 100 = 2520.", difficulty: "easy" },
      { question: "A sum earns 1,500 simple interest at 5% in 5 years. What is the principal?", answer: 6000, explanation: "P = 1500 × 100 / (5 × 5) = 6000.", difficulty: "easy" },
      { question: "At what rate will 4,500 yield 675 in 3 years as simple interest?", answer: 5, explanation: "R = 675 × 100 / (4500 × 3) = 5%.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "compound-interest" },
    [
      { question: "Find the compound interest on 10,000 at 10% p.a. for 2 years, compounded annually.", answer: 2100, explanation: "Amount = 10000 × 1.1 × 1.1 = 12100. CI = 2100.", difficulty: "medium" },
      { question: "What is the amount on 5,000 at 20% p.a. for 1 year?", answer: 6000, explanation: "Amount = 5000 × 1.2 = 6000.", difficulty: "easy" },
      { question: "A sum of 8,000 grows to 9,680 in 1 year at compound interest. What is the rate?", answer: 21, explanation: "Rate = (9680 / 8000 - 1) × 100 = 21%.", difficulty: "hard" },
      { question: "What is the compound interest on 12,000 at 5% p.a. for 2 years?", answer: 1230, explanation: "Amount = 12000 × 1.05² = 13230. CI = 1230.", difficulty: "medium" },
      { question: "A sum amounts to 13,310 in 2 years at 10% p.a. What was the principal?", answer: 11000, explanation: "P = 13310 / 1.1² = 11000.", difficulty: "hard" },
      { question: "What is the amount on 4,000 at 5% p.a. for 3 years compounded annually?", answer: 4631, explanation: "Amount = 4000 × 1.05³ = 4630.5, so the nearest whole number is 4631.", difficulty: "hard" },
      { question: "At 10% p.a., what is the compound interest on 20,000 for 1 year?", answer: 2000, explanation: "For 1 year, CI = simple interest = 20000 × 10 / 100 = 2000.", difficulty: "easy" },
      { question: "A sum doubles in 5 years at compound interest. What is the annual rate if compounded yearly?", answer: 14.87, explanation: "Approximate rate satisfying (1 + r)^5 = 2 is 14.87%.", difficulty: "hard" },
      { question: "What is the CI on 15,000 at 8% p.a. for 2 years?", answer: 2484, explanation: "Amount = 15000 × 1.08² = 17484. CI = 2484.", difficulty: "medium" },
      { question: "A deposit of 10,000 becomes 10,500 in one year. What is the annual compound rate?", answer: 5, explanation: "Increase of 500 on 10,000 gives 5%.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "ratio-proportion" },
    [
      { question: "Simplify the ratio 36:48.", answer: "3:4", options: ["2:3", "3:4", "4:5", "5:6"], correctAnswer: "3:4", explanation: "Divide both terms by 12 to get 3:4.", difficulty: "easy" },
      { question: "If 5 pens cost 150, what will 8 pens cost at the same rate?", answer: 240, explanation: "Cost per pen = 30. For 8 pens, cost = 240.", difficulty: "easy" },
      { question: "Divide 840 in the ratio 3:4.", answer: 360, explanation: "First share = 840 × 3 / 7 = 360.", difficulty: "medium" },
      { question: "If A:B = 2:5 and B:C = 3:4, what is A:C?", answer: "3:10", options: ["1:10", "2:10", "3:10", "4:15"], correctAnswer: "3:10", explanation: "A:B = 2:5 and B:C = 3:4. Equalize B to 15, so A:C = 6:20 = 3:10.", difficulty: "hard" },
      { question: "If 12 workers can finish a task in 15 days, how many days will 20 workers take?", answer: 9, explanation: "Work is constant. Days = 12 × 15 / 20 = 9.", difficulty: "medium" },
      { question: "The ratio of ages of Rahul and Rohan is 4:7. If their sum is 66, what is Rahul's age?", answer: 24, explanation: "Total parts = 11. Rahul's share = 66 × 4 / 11 = 24.", difficulty: "easy" },
      { question: "If x:y = 5:6 and y:z = 4:7, find x:z.", answer: "10:21", options: ["5:21", "10:21", "20:7", "15:28"], correctAnswer: "10:21", explanation: "Equalize y: x:y = 20:24 and y:z = 24:42, so x:z = 20:42 = 10:21.", difficulty: "medium" },
      { question: "A mixture of milk and water is in the ratio 7:3. What fraction of the mixture is milk?", answer: "70%", options: ["60%", "65%", "70%", "75%"], correctAnswer: "70%", explanation: "Milk share = 7/(7+3) = 70%.", difficulty: "easy" },
      { question: "The ratio of boys to girls in a class is 8:5. If there are 40 girls, how many boys are there?", answer: 64, explanation: "5 parts = 40, so 1 part = 8. Boys = 8 × 8 = 64.", difficulty: "medium" },
      { question: "If 3 kg of apples cost 180, what is the cost of 5 kg?", answer: 300, explanation: "Cost per kg = 60. For 5 kg, cost = 300.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "average" },
    [
      { question: "Find the average of 12, 15, 18, 21 and 24.", answer: 18, explanation: "Sum = 90. Average = 90 / 5 = 18.", difficulty: "easy" },
      { question: "The average of 6 numbers is 14. What is their total sum?", answer: 84, explanation: "Total = average × number of items = 14 × 6 = 84.", difficulty: "easy" },
      { question: "The average of 8, 12 and x is 14. What is x?", answer: 22, explanation: "Sum = 14 × 3 = 42, so x = 42 - 20 = 22.", difficulty: "medium" },
      { question: "The average age of 4 people is 25. If one person is 31, what is the average age of the remaining 3?", answer: 23, explanation: "Total age = 100. Remaining total = 69. Average = 23.", difficulty: "medium" },
      { question: "A batsman scores 40, 55, 60, and 45 runs in four innings. What is the average score?", answer: 50, explanation: "Total = 200. Average = 200 / 4 = 50.", difficulty: "easy" },
      { question: "The average of 5 consecutive integers is 18. What is the middle integer?", answer: 18, explanation: "For 5 consecutive integers, the average is the middle number.", difficulty: "easy" },
      { question: "The average of 10 numbers is 20. If one number 35 is replaced by 25, what is the new average?", answer: 19, explanation: "Total decreases by 10. New total = 190, new average = 19.", difficulty: "hard" },
      { question: "The average of 3 numbers is 25. Two numbers are 20 and 30. What is the third number?", answer: 25, explanation: "Total = 75. Third number = 75 - 50 = 25.", difficulty: "easy" },
      { question: "The average weight of 6 boys is 45 kg. If a new boy of 60 kg joins, what is the new average?", answer: 47.14, explanation: "New total = 270 + 60 = 330. Average = 330 / 7 = 47.14.", difficulty: "hard" },
      { question: "The average of 4, 9, 16 and x is 13. What is x?", answer: 23, explanation: "Total = 13 × 4 = 52. x = 52 - 29 = 23.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "partnership" },
    [
      { question: "A and B invest 40,000 and 60,000 respectively in a business. What is their profit-sharing ratio?", answer: "2:3", options: ["3:2", "2:3", "4:5", "5:6"], correctAnswer: "2:3", explanation: "Profit is shared in the ratio of investment. 40000:60000 = 2:3.", difficulty: "easy" },
      { question: "A invests 50,000 for 12 months and B invests 75,000 for 8 months. What is the profit-sharing ratio A:B?", answer: "1:1", options: ["2:3", "3:2", "1:1", "5:4"], correctAnswer: "1:1", explanation: "A:B = 50000×12 : 75000×8 = 600000 : 600000 = 1:1.", difficulty: "hard" },
      { question: "A and B invest 30,000 and 45,000 for the same time. If total profit is 30,000, what is A's share?", answer: 12000, explanation: "Ratio 2:3, so A gets 2/5 of 30000 = 12000.", difficulty: "medium" },
      { question: "A invests 20,000 for 9 months and B invests 30,000 for 6 months. What is the profit ratio?", answer: "1:1", options: ["1:1", "2:3", "3:2", "4:5"], correctAnswer: "1:1", explanation: "A:B = 20000×9 : 30000×6 = 180000 : 180000 = 1:1.", difficulty: "easy" },
      { question: "A, B and C invest in ratio 2:3:5. If profit is 50,000, what is C's share?", answer: 25000, explanation: "Total parts = 10. C gets 5/10 of 50000 = 25000.", difficulty: "easy" },
      { question: "A invests 80,000 and B invests 40,000. If profit is 36,000, what is B's share?", answer: 12000, explanation: "Ratio 2:1. B gets 1/3 of 36000 = 12000.", difficulty: "easy" },
      { question: "A invests 15,000 for 6 months and B invests 10,000 for 9 months. What is the ratio of their capitals?", answer: "1:1", options: ["1:1", "3:2", "2:3", "5:4"], correctAnswer: "1:1", explanation: "A:B = 15000×6 : 10000×9 = 90000 : 90000 = 1:1.", difficulty: "medium" },
      { question: "A contributes 25,000 and B contributes 35,000. If total profit is 24,000, what is A's share?", answer: 10000, explanation: "Ratio = 5:7. A gets 5/12 of 24000 = 10000.", difficulty: "medium" },
      { question: "A invests 60,000 and B invests 90,000. If the business runs for the same duration, what is the ratio of profits?", answer: "2:3", options: ["2:3", "3:2", "4:5", "5:6"], correctAnswer: "2:3", explanation: "Profit ratio equals capital ratio 60000:90000 = 2:3.", difficulty: "easy" },
      { question: "A puts in 45,000 for 4 months and B puts in 30,000 for 6 months. What is the profit-sharing ratio A:B?", answer: "1:1", options: ["1:1", "2:3", "3:2", "5:4"], correctAnswer: "1:1", explanation: "A:B = 45000×4 : 30000×6 = 180000 : 180000 = 1:1.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "mixture-allegation" },
    [
      { question: "In what ratio should water be mixed with milk costing 60/litre so that the resulting mixture costs 45/litre?", answer: "1:3", options: ["1:3", "3:1", "1:2", "2:3"], correctAnswer: "1:3", explanation: "Using allegation, water (0) and milk (60) to get mean 45 gives ratio 15:45 = 1:3.", difficulty: "medium" },
      { question: "A mixture contains milk and water in the ratio 5:2. What fraction of the mixture is water?", answer: "2/7", options: ["1/2", "2/7", "3/7", "5/7"], correctAnswer: "2/7", explanation: "Water share = 2/(5+2) = 2/7.", difficulty: "easy" },
      { question: "How many litres of water must be added to 30 litres of milk to make the ratio milk:water 3:1?", answer: 10, explanation: "For ratio 3:1, water should be 10 litres when milk is 30 litres.", difficulty: "easy" },
      { question: "A 40-litre mixture has milk and water in ratio 7:3. How much milk is there?", answer: 28, explanation: "Milk share = 7/10 of 40 = 28 litres.", difficulty: "easy" },
      { question: "A trader mixes two varieties of rice costing 40/kg and 60/kg in equal quantities. What is the cost price per kg of the mixture?", answer: 50, explanation: "Average of equal quantities = (40 + 60)/2 = 50.", difficulty: "easy" },
      { question: "In what ratio should tea costing 80/kg be mixed with tea costing 50/kg to obtain a mixture costing 65/kg?", answer: "1:1", options: ["1:1", "2:3", "3:2", "4:5"], correctAnswer: "1:1", explanation: "Using allegation, ratio = (65-50):(80-65) = 15:15 = 1:1.", difficulty: "medium" },
      { question: "A mixture of 20 litres contains 60% milk. How much water should be added to make milk 50% of the mixture?", answer: 4, explanation: "Milk = 12 litres. For milk to be 50%, final volume must be 24 litres. Add 4 litres water.", difficulty: "medium" },
      { question: "Two liquids cost 30/litre and 50/litre. In what ratio should they be mixed to get 42/litre?", answer: "2:3", options: ["2:3", "3:2", "1:2", "4:5"], correctAnswer: "2:3", explanation: "Ratio = (50-42):(42-30) = 8:12 = 2:3.", difficulty: "medium" },
      { question: "A milkman replaces 2 litres of milk with water in a 10-litre mixture. What is the new ratio of milk to water if the original mixture was pure milk?", answer: "4:1", options: ["4:1", "5:1", "3:1", "2:1"], correctAnswer: "4:1", explanation: "Milk left = 8 litres, water added = 2 litres, so ratio = 4:1.", difficulty: "hard" },
      { question: "A 60-litre solution has acid and water in ratio 2:3. How much acid should be added to make the ratio 1:1?", answer: 12, explanation: "Acid = 24, water = 36. To make 1:1, acid must become 36, so add 12 litres.", difficulty: "hard" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "pipes-cisterns" },
    [
      { question: "Pipe A fills a tank in 10 hours. How much of the tank will it fill in 3 hours?", answer: 3, explanation: "In 10 hours it fills 1 tank, so in 3 hours it fills 3/10 of the tank.", difficulty: "easy" },
      { question: "A pipe fills a tank in 8 hours and another empties it in 12 hours. How long will they take together to fill the tank?", answer: 24, explanation: "Net rate = 1/8 - 1/12 = 1/24 tank per hour.", difficulty: "medium" },
      { question: "Two pipes together fill a tank in 6 hours. One pipe alone fills it in 10 hours. How long will the second pipe take alone?", answer: 15, explanation: "Second pipe rate = 1/6 - 1/10 = 1/15.", difficulty: "medium" },
      { question: "A tank is filled by pipe A in 5 hours and by pipe B in 15 hours. How long will they take together?", answer: 3.75, explanation: "Combined rate = 1/5 + 1/15 = 4/15. Time = 15/4 = 3.75 hours.", difficulty: "hard" },
      { question: "A cistern is filled in 12 hours but leaks cause it to fill in 18 hours. How long does the leak alone take to empty the full cistern?", answer: 36, explanation: "Leak rate = 1/12 - 1/18 = 1/36 tank per hour.", difficulty: "hard" },
      { question: "Pipe A fills a tank in 20 hours and pipe B fills it in 30 hours. Together, how long do they take?", answer: 12, explanation: "Combined rate = 1/20 + 1/30 = 1/12.", difficulty: "easy" },
      { question: "A tank has a fill pipe and an empty pipe. Fill pipe fills in 9 hours, empty pipe empties in 18 hours. Net filling time?", answer: 18, explanation: "Net rate = 1/9 - 1/18 = 1/18.", difficulty: "medium" },
      { question: "A pipe fills a tank in 24 minutes. What fraction of the tank does it fill in 6 minutes?", answer: "1/4", options: ["1/6", "1/4", "1/3", "1/2"], correctAnswer: "1/4", explanation: "6/24 = 1/4 of the tank.", difficulty: "easy" },
      { question: "Pipe A alone fills a tank in 4 hours, pipe B alone in 12 hours. Time taken together?", answer: 3, explanation: "Combined rate = 1/4 + 1/12 = 1/3.", difficulty: "easy" },
      { question: "A tank is filled by a pipe in 16 hours. A leak empties it in 32 hours. How long will the tank take to fill when both are open?", answer: 32, explanation: "Net rate = 1/16 - 1/32 = 1/32.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...arithmeticMeta, topic: "problems-on-ages" },
    [
      { question: "The ratio of ages of A and B is 3:5. If their sum is 64, what is B's age?", answer: 40, explanation: "Total parts = 8. B's age = 64 × 5 / 8 = 40.", difficulty: "easy" },
      { question: "A father is 4 times as old as his son. After 10 years, he will be 3 times as old. What is the son's present age?", answer: 10, explanation: "Let son = x. 4x + 10 = 3(x + 10), so x = 10.", difficulty: "medium" },
      { question: "The present ages of two brothers are in ratio 3:5. After 4 years, their ages will sum to 40. Find the younger brother's age.", answer: 12, explanation: "Let ages be 3x and 5x. 3x + 4 + 5x + 4 = 40, so 8x = 32 and x = 4. Younger = 12.", difficulty: "hard" },
      { question: "If the sum of present ages of a mother and daughter is 50 and the mother is 4 times the daughter, what is the daughter's age?", answer: 10, explanation: "Let daughter = x, mother = 4x. Then 5x = 50, so x = 10.", difficulty: "easy" },
      { question: "Five years ago, A was 20 years old. What is A's present age?", answer: 25, explanation: "Present age = 20 + 5 = 25.", difficulty: "easy" },
      { question: "A is 8 years older than B. Their present ages sum to 36. Find B's age.", answer: 14, explanation: "If B = x, A = x + 8. Then 2x + 8 = 36, so x = 14.", difficulty: "medium" },
      { question: "The father is 3 times the age of his son. After 12 years, the father will be twice the son. What is the son's current age?", answer: 12, explanation: "Let son = x. 3x + 12 = 2(x + 12), so x = 12.", difficulty: "medium" },
      { question: "The ratio of ages of P and Q is 5:7. After 6 years, the ratio will be 4:5. What is P's present age?", answer: 10, explanation: "Let ages be 5x and 7x. (5x+6)/(7x+6)=4/5, so 25x + 30 = 28x + 24 and x = 2. P's age = 10.", difficulty: "hard" },
      { question: "The sum of ages of mother and son is 42. Eight years ago, the mother was five times the son's age. What is the son's present age?", answer: 10, explanation: "Let son = x, mother = 42 - x. Then 42 - x - 8 = 5(x - 8), giving x = 10.", difficulty: "hard" },
      { question: "In 6 years, Rahul will be twice as old as he is now. What is Rahul's present age?", answer: 6, explanation: "Let age = x. x + 6 = 2x, so x = 6.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...timeBasedMeta, topic: "timeWork" },
    [
      { question: "A can complete a work in 12 days. How much work will A do in 3 days?", answer: "1/4", options: ["1/5", "1/4", "1/3", "1/2"], correctAnswer: "1/4", explanation: "3 days is 3/12 of the work, so 1/4.", difficulty: "easy" },
      { question: "A and B together can finish a work in 6 days. If A alone can do it in 10 days, how long will B take alone?", answer: 15, explanation: "B's rate = 1/6 - 1/10 = 1/15.", difficulty: "medium" },
      { question: "A can do a work in 8 days and B in 12 days. How long will they take together?", answer: 4.8, explanation: "Combined rate = 1/8 + 1/12 = 5/24. Time = 24/5 = 4.8 days.", difficulty: "medium" },
      { question: "If 5 men can complete a work in 18 days, how many days will 6 men take, assuming equal efficiency?", answer: 15, explanation: "Work is constant, so days = 5 × 18 / 6 = 15.", difficulty: "easy" },
      { question: "A can do a job in 20 days. B is twice as efficient as A. How long will B take?", answer: 10, explanation: "Twice the efficiency means half the time, so 10 days.", difficulty: "easy" },
      { question: "A and B can finish a project in 12 days. They work together for 4 days, then A leaves. If B alone finishes the remaining work in 8 days, how long would B take alone?", answer: 12, explanation: "Together they do 1/3 of the work in 4 days, so 2/3 remains. If B finishes 2/3 in 8 days, B alone would finish the whole work in 12 days.", difficulty: "hard" },
      { question: "A is 50% more efficient than B. If B can do a work in 18 days, how long will A take?", answer: 12, explanation: "A's efficiency = 1.5B, so time = 18 / 1.5 = 12 days.", difficulty: "medium" },
      { question: "A, B and C can do a job in 12, 18 and 36 days respectively. How long will they take together?", answer: 6, explanation: "Combined rate = 1/12 + 1/18 + 1/36 = 1/6.", difficulty: "hard" },
      { question: "If 8 workers complete a task in 9 days, how many workers are needed to finish it in 6 days?", answer: 12, explanation: "Workers and days are inversely proportional. Workers = 8 × 9 / 6 = 12.", difficulty: "easy" },
      { question: "A does a work in 30 days and B does the same work in 20 days. Together they work for 6 days. What fraction of work remains?", answer: "1/2", options: ["1/3", "1/2", "2/3", "3/5"], correctAnswer: "1/2", explanation: "Combined rate = 1/30 + 1/20 = 1/12. Work done in 6 days = 1/2. Remaining = 1/2.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...timeBasedMeta, topic: "timeSpeed" },
    [
      { question: "A car travels 180 km in 3 hours. What is its speed?", answer: 60, explanation: "Speed = distance / time = 180 / 3 = 60 km/h.", difficulty: "easy" },
      { question: "A bike moves at 45 km/h for 2 hours. What distance does it cover?", answer: 90, explanation: "Distance = speed × time = 45 × 2 = 90 km.", difficulty: "easy" },
      { question: "If a person walks 6 km in 1.5 hours, what is the speed in km/h?", answer: 4, explanation: "Speed = 6 / 1.5 = 4 km/h.", difficulty: "easy" },
      { question: "A train covers 300 km in 5 hours. What is the average speed?", answer: 60, explanation: "Average speed = 300 / 5 = 60 km/h.", difficulty: "easy" },
      { question: "A vehicle travels 120 km at 40 km/h and returns at 60 km/h. What is the average speed for the round trip?", answer: 48, explanation: "Average speed = total distance / total time = 240 / (3 + 2) = 48 km/h.", difficulty: "hard" },
      { question: "If speed increases by 20% and time decreases correspondingly for the same distance, what is the new time as a percentage of the old time?", answer: "83.33%", options: ["80%", "83.33%", "85%", "90%"], correctAnswer: "83.33%", explanation: "Time is inversely proportional to speed. New time = 100/120 = 83.33% of old time.", difficulty: "hard" },
      { question: "A car travels at 72 km/h. What is the speed in m/s?", answer: 20, explanation: "72 × 5 / 18 = 20 m/s.", difficulty: "medium" },
      { question: "How long will it take to travel 150 km at 75 km/h?", answer: 2, explanation: "Time = 150 / 75 = 2 hours.", difficulty: "easy" },
      { question: "A runner covers 100 m in 10 seconds. What is his speed in m/s?", answer: 10, explanation: "Speed = 100 / 10 = 10 m/s.", difficulty: "easy" },
      { question: "A person covers 24 km in 40 minutes. What is the speed in km/h?", answer: 36, explanation: "40 minutes = 2/3 hour. Speed = 24 / (2/3) = 36 km/h.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...timeBasedMeta, topic: "trains" },
    [
      { question: "A 150 m long train passes a pole in 9 seconds. What is its speed in m/s?", answer: 16.67, explanation: "Speed = distance / time = 150 / 9 = 16.67 m/s.", difficulty: "medium" },
      { question: "A train of length 200 m passes a platform of length 300 m in 25 seconds. What is its speed in m/s?", answer: 20, explanation: "Distance = 200 + 300 = 500 m. Speed = 500 / 25 = 20 m/s.", difficulty: "medium" },
      { question: "A train running at 72 km/h crosses a pole. If its length is 180 m, how long does it take?", answer: 9, explanation: "72 km/h = 20 m/s. Time = 180 / 20 = 9 s.", difficulty: "easy" },
      { question: "A 120 m train crosses another 180 m train moving in opposite direction at 54 km/h and 36 km/h. How much time will they take to cross each other?", answer: 12, explanation: "Relative speed = 54 + 36 = 90 km/h = 25 m/s. Total distance = 300 m. Time = 300/25 = 12 s.", difficulty: "hard" },
      { question: "A train crosses a 90 m platform in 18 seconds at 54 km/h. What is the length of the train?", answer: 180, explanation: "54 km/h = 15 m/s. Distance covered in 18 seconds = 270 m. Train length = 270 - 90 = 180 m.", difficulty: "hard" },
      { question: "A train 250 m long passes a man in 10 seconds. What is the train's speed in km/h?", answer: 90, explanation: "Speed = 250/10 = 25 m/s = 90 km/h.", difficulty: "easy" },
      { question: "Two trains 100 m and 150 m long moving in the same direction at 40 km/h and 55 km/h. How long to overtake?", answer: 60, explanation: "Relative speed = 15 km/h = 4.17 m/s. Distance = 250 m, time ≈ 60 s.", difficulty: "hard" },
      { question: "A train of length 180 m passes a 220 m platform in 20 seconds. What is its speed in m/s?", answer: 20, explanation: "Distance = 400 m. Speed = 400 / 20 = 20 m/s.", difficulty: "easy" },
      { question: "A train crosses a 50 m pole in 5 seconds. If it runs at 72 km/h, what is its length?", answer: 100, explanation: "72 km/h = 20 m/s. Length = 20 × 5 = 100 m.", difficulty: "easy" },
      { question: "A 160 m train at 54 km/h crosses another train of 140 m at 36 km/h in opposite direction. Time taken?", answer: 12, explanation: "Relative speed = 54 + 36 = 90 km/h = 25 m/s. Total distance = 300 m. Time = 300 / 25 = 12 s.", difficulty: "hard" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...timeBasedMeta, topic: "boats-streams" },
    [
      { question: "A boat's speed in still water is 12 km/h and stream speed is 3 km/h. What is downstream speed?", answer: 15, explanation: "Downstream speed = 12 + 3 = 15 km/h.", difficulty: "easy" },
      { question: "A boat's still-water speed is 10 km/h and stream speed is 2 km/h. What is upstream speed?", answer: 8, explanation: "Upstream speed = 10 - 2 = 8 km/h.", difficulty: "easy" },
      { question: "A boat covers 24 km downstream in 2 hours. If stream speed is 2 km/h, what is the boat's speed in still water?", answer: 10, explanation: "Downstream speed = 12 km/h. Still-water speed = 12 - 2 = 10 km/h.", difficulty: "medium" },
      { question: "A boat takes 3 hours to go 18 km upstream. If stream speed is 1 km/h, what is the boat's still-water speed?", answer: 7, explanation: "Upstream speed = 6 km/h. Still-water speed = 6 + 1 = 7 km/h.", difficulty: "medium" },
      { question: "A boat takes 5 hours to go 40 km downstream and 8 hours to return. What is the stream speed?", answer: "1.5 km/h", options: ["1 km/h", "1.5 km/h", "2 km/h", "2.5 km/h"], correctAnswer: "1.5 km/h", explanation: "Downstream speed = 8 km/h and upstream speed = 5 km/h. Stream speed = (8 - 5)/2 = 1.5 km/h.", difficulty: "hard" },
      { question: "A boat can travel at 14 km/h in still water. If stream speed is 4 km/h, what is the ratio of downstream to upstream speed?", answer: "9:5", options: ["9:5", "5:9", "7:3", "3:7"], correctAnswer: "9:5", explanation: "Downstream = 18, upstream = 10, ratio = 9:5.", difficulty: "medium" },
      { question: "A boat covers 30 km downstream in 2 hours. If upstream speed is 10 km/h, what is the stream speed?", answer: "2.5 km/h", options: ["1.5 km/h", "2 km/h", "2.5 km/h", "3 km/h"], correctAnswer: "2.5 km/h", explanation: "Downstream speed = 15 km/h. Still-water speed = (15 + 10)/2 = 12.5 km/h, so stream speed = 2.5 km/h.", difficulty: "hard" },
      { question: "A boat goes 16 km upstream in 4 hours. What is its upstream speed?", answer: 4, explanation: "Speed = 16 / 4 = 4 km/h.", difficulty: "easy" },
      { question: "If a boat's downstream speed is 18 km/h and upstream speed is 12 km/h, what is the still-water speed?", answer: 15, explanation: "Still-water speed = (18 + 12) / 2 = 15 km/h.", difficulty: "easy" },
      { question: "A boat travels 20 km downstream in 1 hour 20 minutes. What is downstream speed?", answer: 15, explanation: "1 hour 20 min = 4/3 hour. Speed = 20 / (4/3) = 15 km/h.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...algebraMeta, topic: "numberSystem" },
    [
      { question: "What is the remainder when 57 is divided by 5?", answer: 2, explanation: "57 = 5 × 11 + 2.", difficulty: "easy" },
      { question: "Which of the following is divisible by 9?", answer: 729, options: ["728", "729", "730", "731"], correctAnswer: "729", explanation: "Sum of digits of 729 is 18, which is divisible by 9.", difficulty: "easy" },
      { question: "Find the smallest number that leaves remainder 3 when divided by 5, 6 and 7.", answer: 213, explanation: "LCM of 5, 6, 7 is 210. Add 3 => 213.", difficulty: "hard" },
      { question: "What is the unit digit of 7^4?", answer: 1, explanation: "Unit digits of powers of 7 cycle as 7,9,3,1.", difficulty: "easy" },
      { question: "How many positive factors does 36 have?", answer: 9, explanation: "36 = 2^2 × 3^2. Number of factors = (2+1)(2+1) = 9.", difficulty: "medium" },
      { question: "What is the largest 3-digit number divisible by 8?", answer: 992, explanation: "999 rounded down to nearest multiple of 8 is 992.", difficulty: "easy" },
      { question: "Find the remainder when 2^10 is divided by 3.", answer: 1, explanation: "2 mod 3 cycles as 2,1; 2^10 leaves remainder 1.", difficulty: "medium" },
      { question: "What is the least number to be added to 125 to make it divisible by 7?", answer: 1, explanation: "125 leaves remainder 6 on division by 7, so add 1.", difficulty: "easy" },
      { question: "How many integers between 1 and 100 are divisible by 4 but not by 8?", answer: 13, explanation: "Multiples of 4 = 25, multiples of 8 = 12. Difference = 13.", difficulty: "hard" },
      { question: "What is the greatest 2-digit number divisible by 11?", answer: 99, explanation: "99 is divisible by 11 and is the largest 2-digit such number.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...algebraMeta, topic: "hcf-lcm" },
    [
      { question: "Find the HCF of 18 and 24.", answer: 6, explanation: "Common factors are 1, 2, 3, 6. Greatest is 6.", difficulty: "easy" },
      { question: "Find the LCM of 12 and 15.", answer: 60, explanation: "12 = 2^2 × 3, 15 = 3 × 5. LCM = 2^2 × 3 × 5 = 60.", difficulty: "easy" },
      { question: "Two numbers have HCF 8 and LCM 120. If one number is 24, what is the other?", answer: 40, explanation: "Product = HCF × LCM = 960. Other number = 960 / 24 = 40.", difficulty: "medium" },
      { question: "What is the least number divisible by 6, 8 and 12?", answer: 24, explanation: "LCM of 6, 8, 12 is 24.", difficulty: "easy" },
      { question: "What is the greatest number that divides 36, 48 and 60 exactly?", answer: 12, explanation: "HCF of 36, 48 and 60 is 12.", difficulty: "medium" },
      { question: "If HCF of two numbers is 4 and their product is 448, what could be the numbers if one is 28?", answer: 16, explanation: "Other number = 448 / 28 = 16.", difficulty: "easy" },
      { question: "Find the HCF of 54 and 90.", answer: 18, explanation: "54 = 2 × 3^3, 90 = 2 × 3^2 × 5. HCF = 2 × 3^2 = 18.", difficulty: "medium" },
      { question: "Find the LCM of 9, 12 and 18.", answer: 36, explanation: "LCM = 2^2 × 3^2 = 36.", difficulty: "easy" },
      { question: "What is the smallest number that leaves remainders 1, 2 and 3 when divided by 2, 3 and 4 respectively?", answer: 11, explanation: "Number = 11 works: 11 mod 2 = 1, mod 3 = 2, mod 4 = 3.", difficulty: "hard" },
      { question: "Find the HCF of 72 and 120.", answer: 24, explanation: "72 = 2^3 × 3^2, 120 = 2^3 × 3 × 5. HCF = 2^3 × 3 = 24.", difficulty: "medium" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...algebraMeta, topic: "surds-indices" },
    [
      { question: "Simplify 2^3 × 2^4.", answer: 128, explanation: "2^3 × 2^4 = 2^7 = 128.", difficulty: "easy" },
      { question: "What is the value of (3^2)^3?", answer: 729, explanation: "(3^2)^3 = 3^6 = 729.", difficulty: "easy" },
      { question: "Simplify sqrt(49) + sqrt(36).", answer: 13, explanation: "7 + 6 = 13.", difficulty: "easy" },
      { question: "Rationalize 1/sqrt(2) approximately. What is the value?", answer: "0.707", options: ["0.5", "0.707", "0.75", "0.8"], correctAnswer: "0.707", explanation: "1/sqrt(2) is approximately 0.707.", difficulty: "medium" },
      { question: "Simplify 5^0 + 2^3.", answer: 9, explanation: "5^0 = 1 and 2^3 = 8. Sum = 9.", difficulty: "easy" },
      { question: "What is the value of 16^(3/4)?", answer: 8, explanation: "16^(1/4) = 2. 2^3 = 8.", difficulty: "hard" },
      { question: "Simplify sqrt(18) + sqrt(8).", answer: "5sqrt(2)", options: ["4sqrt(2)", "5sqrt(2)", "6sqrt(2)", "7sqrt(2)"], correctAnswer: "5sqrt(2)", explanation: "sqrt(18) = 3sqrt(2) and sqrt(8) = 2sqrt(2), so the sum is 5sqrt(2).", difficulty: "medium" },
      { question: "If x^2 = 81 and x is positive, what is x?", answer: 9, explanation: "x = 9.", difficulty: "easy" },
      { question: "Simplify 2^-3.", answer: 1 / 8, explanation: "2^-3 = 1/2^3 = 1/8.", difficulty: "medium" },
      { question: "What is the value of sqrt(64/4)?", answer: 4, explanation: "64/4 = 16 and sqrt(16) = 4.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...algebraMeta, topic: "quadratic" },
    [
      { question: "If the roots of x^2 - 5x + 6 = 0 are?", answer: "2 and 3", options: ["1 and 6", "2 and 3", "3 and 4", "4 and 5"], correctAnswer: "2 and 3", explanation: "Factorization gives (x - 2)(x - 3) = 0.", difficulty: "easy" },
      { question: "What is the sum of roots of x^2 - 7x + 10 = 0?", answer: 7, explanation: "For ax^2 + bx + c = 0, sum of roots = -b/a = 7.", difficulty: "easy" },
      { question: "What is the product of roots of x^2 + 4x - 12 = 0?", answer: -12, explanation: "Product of roots = c/a = -12.", difficulty: "easy" },
      { question: "Find the discriminant of x^2 - 4x + 4 = 0.", answer: 0, explanation: "Discriminant = b^2 - 4ac = 16 - 16 = 0.", difficulty: "medium" },
      { question: "If the roots of x^2 - 9x + 20 = 0 are?", answer: "4 and 5", options: ["2 and 10", "3 and 7", "4 and 5", "1 and 20"], correctAnswer: "4 and 5", explanation: "The equation factors as (x - 4)(x - 5) = 0.", difficulty: "easy" },
      { question: "For what value of k will x^2 - (k+1)x + k = 0 have roots 1 and 4?", answer: 4, explanation: "Sum of roots = 1 + 4 = 5, so k + 1 = 5 and k = 4. Product also matches k = 4.", difficulty: "hard" },
      { question: "What is the nature of roots of x^2 + 2x + 5 = 0?", answer: "No real roots", options: ["Two real roots", "One real root", "No real roots", "Equal real roots"], correctAnswer: "No real roots", explanation: "Discriminant = 4 - 20 = -16 < 0.", difficulty: "medium" },
      { question: "If one root of x^2 - 8x + c = 0 is 2, what is c?", answer: 12, explanation: "Product of roots = c. Other root = 6, so c = 2 × 6 = 12.", difficulty: "medium" },
      { question: "Solve x^2 - 6x + 9 = 0. What is the repeated root?", answer: 3, explanation: "The equation is (x - 3)^2 = 0.", difficulty: "easy" },
      { question: "What is the value of k if x^2 + kx + 16 = 0 has equal roots and k is negative?", answer: -8, explanation: "Equal roots => k^2 = 64, so k = -8.", difficulty: "hard" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...algebraMeta, topic: "simplification" },
    [
      { question: "Simplify 18 + 6 × 2.", answer: 30, explanation: "BODMAS: 6 × 2 = 12, then 18 + 12 = 30.", difficulty: "easy" },
      { question: "Simplify (24 ÷ 6) × 3.", answer: 12, explanation: "(24 ÷ 6) × 3 = 4 × 3 = 12.", difficulty: "easy" },
      { question: "Simplify 100 - 25 + 5 × 6.", answer: 105, explanation: "5 × 6 = 30. Then 100 - 25 + 30 = 105.", difficulty: "medium" },
      { question: "Simplify 48 ÷ (6 × 2).", answer: 4, explanation: "6 × 2 = 12, so 48 ÷ 12 = 4.", difficulty: "easy" },
      { question: "Simplify 2/3 + 1/6.", answer: "5/6", options: ["1/2", "2/3", "5/6", "7/6"], correctAnswer: "5/6", explanation: "2/3 = 4/6, 4/6 + 1/6 = 5/6.", difficulty: "medium" },
      { question: "Simplify 7^2 - 3^2.", answer: 40, explanation: "49 - 9 = 40.", difficulty: "easy" },
      { question: "Simplify (5 + 3)^2.", answer: 64, explanation: "(8)^2 = 64.", difficulty: "easy" },
      { question: "Simplify 60% of 150.", answer: 90, explanation: "60/100 × 150 = 90.", difficulty: "easy" },
      { question: "Simplify 3/4 of 32.", answer: 24, explanation: "3/4 × 32 = 24.", difficulty: "easy" },
      { question: "Simplify 15 × 4 - 3 × 8.", answer: 36, explanation: "60 - 24 = 36.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...diMeta, topic: "barGraph" },
    [
      { question: "Sales of a product were 40, 50, 60, 70 and 80 units in five months. What is the total sales?", answer: 300, explanation: "Total = 40 + 50 + 60 + 70 + 80 = 300.", difficulty: "easy" },
      { question: "In a bar graph, if values are 20, 35, 25 and 40, what is the highest value?", answer: 40, explanation: "Highest among the given values is 40.", difficulty: "easy" },
      { question: "If the sales values are 30, 45, 60 and 75, what is the average sales?", answer: 52.5, explanation: "Total = 210. Average = 210 / 4 = 52.5.", difficulty: "medium" },
      { question: "A company's monthly production is 100, 120, 140, 160. What is the increase from first to last month?", answer: 60, explanation: "160 - 100 = 60.", difficulty: "easy" },
      { question: "Values in a bar graph are 25, 30, 35, 40, 45. What is the difference between highest and lowest?", answer: 20, explanation: "45 - 25 = 20.", difficulty: "easy" },
      { question: "If the values are 18, 22, 24, 26, 30, what is the sum of the middle three values when arranged in order?", answer: 72, explanation: "Middle three are 22, 24, 26; sum = 72.", difficulty: "medium" },
      { question: "A bar graph shows 50 units in January and 75 in February. What is the percentage increase?", answer: 50, explanation: "Increase = 25. Percentage increase = 25/50 × 100 = 50%.", difficulty: "medium" },
      { question: "If total sales in 4 months are 220 and three months are 50, 60 and 55, what is the fourth month sales?", answer: 55, explanation: "Fourth month = 220 - (50+60+55) = 55.", difficulty: "easy" },
      { question: "If all bars are 10 units apart and highest is 90, what is the next bar after 70?", answer: 80, explanation: "Series increments by 10.", difficulty: "easy" },
      { question: "A bar graph has values 15, 30, 45, 60, 75. What is the median?", answer: 45, explanation: "Ordered middle value is 45.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...diMeta, topic: "pieChart" },
    [
      { question: "In a pie chart, if a sector represents 25% of 400 units, how many units does it represent?", answer: 100, explanation: "25% of 400 = 100.", difficulty: "easy" },
      { question: "A pie chart has sectors 40%, 30%, 20% and 10%. If total is 500, what is the largest sector value?", answer: 200, explanation: "40% of 500 = 200.", difficulty: "easy" },
      { question: "If total expenditure is 600 and food takes 35%, what is the food expenditure?", answer: 210, explanation: "35% of 600 = 210.", difficulty: "easy" },
      { question: "A pie chart shows 120 degrees for one category. What percentage of the whole does it represent?", answer: 33.33, explanation: "120/360 × 100 = 33.33%.", difficulty: "medium" },
      { question: "If a sector is 72 degrees in a 360-degree pie chart, what percent is it?", answer: 20, explanation: "72/360 × 100 = 20%.", difficulty: "easy" },
      { question: "A company spends 45% on salaries out of 800. What is salary expense?", answer: 360, explanation: "45% of 800 = 360.", difficulty: "easy" },
      { question: "The pie chart shows 90 degrees for transport. What fraction of the whole is transport?", answer: "1/4", options: ["1/2", "1/3", "1/4", "1/5"], correctAnswer: "1/4", explanation: "90/360 = 1/4.", difficulty: "easy" },
      { question: "If one segment is 15% and total is 1,000, what is the segment value?", answer: 150, explanation: "15% of 1000 = 150.", difficulty: "easy" },
      { question: "If the pie chart total is 720 degrees, what is the angle for 10%?", answer: 72, explanation: "10% of 720 degrees = 72 degrees.", difficulty: "medium" },
      { question: "A segment representing 50% of a chart covers how many degrees?", answer: 180, explanation: "50% of 360 = 180 degrees.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...diMeta, topic: "line-graph" },
    [
      { question: "A line graph shows values 10, 20, 30, 40. What is the total increase from first to last?", answer: 30, explanation: "40 - 10 = 30.", difficulty: "easy" },
      { question: "If values are 5, 15, 25, 35, what is the average increase per step?", answer: 10, explanation: "Each step increases by 10.", difficulty: "easy" },
      { question: "A line graph has points at 12, 18, 24 and 30. What is the median?", answer: 21, explanation: "Median of 12,18,24,30 is (18+24)/2 = 21.", difficulty: "medium" },
      { question: "If the graph values are 20, 25, 30, 28, what is the decrease from the peak to the last value?", answer: 2, explanation: "Peak is 30, last is 28, decrease = 2.", difficulty: "easy" },
      { question: "A line graph shows production 100, 120, 150, 180. What is the percentage increase from first to last?", answer: 80, explanation: "Increase = 80 on base 100, so 80%.", difficulty: "medium" },
      { question: "If values are 60, 55, 50, 45, what is the total decrease?", answer: 15, explanation: "60 - 45 = 15.", difficulty: "easy" },
      { question: "A line graph has four values whose sum is 200. Three values are 40, 45 and 55. What is the fourth?", answer: 60, explanation: "Fourth = 200 - 140 = 60.", difficulty: "easy" },
      { question: "If the graph rises by 5 units each period from 10, what is the fourth point?", answer: 25, explanation: "10, 15, 20, 25.", difficulty: "easy" },
      { question: "If the highest point is 90 and the lowest is 30, what is the range?", answer: 60, explanation: "Range = 90 - 30 = 60.", difficulty: "easy" },
      { question: "A line graph moves 8, 16, 24, 32. What is the common difference?", answer: 8, explanation: "The increase between each point is 8.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...diMeta, topic: "tables" },
    [
      { question: "A table lists 12, 18, 24 and 30. What is the sum?", answer: 84, explanation: "12 + 18 + 24 + 30 = 84.", difficulty: "easy" },
      { question: "If table values are 45, 50, 55 and 60, what is the average?", answer: 52.5, explanation: "Total = 210. Average = 52.5.", difficulty: "medium" },
      { question: "In a table, if one column has 100, 90, 80, 70, what is the total decrease?", answer: 30, explanation: "100 to 70 is a decrease of 30.", difficulty: "easy" },
      { question: "A table shows 15, 25, 35, 45, 55. What is the median?", answer: 35, explanation: "The middle value is 35.", difficulty: "easy" },
      { question: "If the rows sum to 60, 70 and 80, what is the total?", answer: 210, explanation: "60 + 70 + 80 = 210.", difficulty: "easy" },
      { question: "Table values are 8, 16, 24, 32. What is the ratio of first to last?", answer: "1:4", options: ["1:2", "1:3", "1:4", "2:5"], correctAnswer: "1:4", explanation: "8:32 simplifies to 1:4.", difficulty: "easy" },
      { question: "If a table shows 200 and 150, what is the difference?", answer: 50, explanation: "200 - 150 = 50.", difficulty: "easy" },
      { question: "A table has values increasing by 7 from 14. What is the third value?", answer: 28, explanation: "14, 21, 28.", difficulty: "easy" },
      { question: "If a table total is 300 and three entries are 80, 90 and 70, what is the fourth entry?", answer: 60, explanation: "300 - 240 = 60.", difficulty: "medium" },
      { question: "A table lists 11, 22, 33, 44. What is the sum of the first two values?", answer: 33, explanation: "11 + 22 = 33.", difficulty: "easy" },
    ],
  ),
);

quantitative.push(
  ...buildTopicQuestions(
    { ...diMeta, topic: "caselet-di" },
    [
      { question: "A company sold 100, 120 and 140 units in three quarters. What is the total sales?", answer: 360, explanation: "100 + 120 + 140 = 360.", difficulty: "easy" },
      { question: "If revenue is 200, 250 and 300 in three months, what is the average revenue?", answer: 250, explanation: "Total = 750. Average = 250.", difficulty: "easy" },
      { question: "A caselet says expenses are 400 and income is 500. What is the profit?", answer: 100, explanation: "Profit = income - expense = 100.", difficulty: "easy" },
      { question: "If two product lines earn 180 and 220, what is the combined earning?", answer: 400, explanation: "180 + 220 = 400.", difficulty: "easy" },
      { question: "A business has expenses of 300, 350 and 400. What is the total expense?", answer: 1050, explanation: "300 + 350 + 400 = 1050.", difficulty: "easy" },
      { question: "Caselet: Sales are 90, 110, 130 and 150. What is the increase from first to last?", answer: 60, explanation: "150 - 90 = 60.", difficulty: "easy" },
      { question: "If profit margins are 10%, 15% and 20% on equal sales, what is the average margin?", answer: 15, explanation: "Average = (10+15+20)/3 = 15%.", difficulty: "medium" },
      { question: "A caselet lists monthly costs as 60, 70, 80 and 90. What is the median?", answer: 75, explanation: "Median = (70 + 80)/2 = 75.", difficulty: "medium" },
      { question: "If output values are 50, 75 and 125, what is the ratio of first to last?", answer: "2:5", options: ["1:2", "2:5", "3:5", "4:5"], correctAnswer: "2:5", explanation: "50:125 simplifies to 2:5.", difficulty: "easy" },
      { question: "A caselet shows 40% of 500 units sold in one channel. How many units are sold there?", answer: 200, explanation: "40% of 500 = 200.", difficulty: "easy" },
    ],
  ),
);

const logical = [];
const syllogismOptions = [
  "Only conclusion I follows",
  "Only conclusion II follows",
  "Both conclusions follow",
  "Neither conclusion follows",
];

const assumptionOptions = [
  "Only assumption I is implicit",
  "Only assumption II is implicit",
  "Both assumptions are implicit",
  "Neither assumption is implicit",
];

const causeEffectOptions = [
  "Statement I is the cause and II is the effect",
  "Statement II is the cause and I is the effect",
  "Both are independent causes",
  "Neither is a cause of the other",
];

const assertionReasonOptions = [
  "A and R are true and R is the correct explanation of A",
  "A and R are true but R is not the correct explanation of A",
  "A is true but R is false",
  "A is false but R is true",
];

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Verbal Reasoning", topic: "syllogism" },
    [
      { question: "Statements: All pens are instruments. All instruments are useful. Conclusions: I. All pens are useful. II. All useful things are pens.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "If all pens are instruments and all instruments are useful, then all pens are useful. The reverse is not true.", difficulty: "easy" },
      { question: "Statements: Some teachers are writers. All writers are readers. Conclusions: I. Some teachers are readers. II. Some readers are teachers.", answer: "Both conclusions follow", options: syllogismOptions, correctAnswer: "Both conclusions follow", explanation: "Some teachers are writers and all writers are readers, so some teachers are readers. That also means some readers are teachers.", difficulty: "medium" },
      { question: "Statements: No cats are dogs. All dogs are pets. Conclusions: I. No cat is a pet. II. Some cats are not dogs.", answer: "Neither conclusion follows", options: syllogismOptions, correctAnswer: "Neither conclusion follows", explanation: "From the statements we cannot conclude anything definite about cats being pets or even the existence of cats.", difficulty: "hard" },
      { question: "Statements: All mangoes are fruits. Some fruits are sweet. Conclusions: I. Some mangoes are sweet. II. Some sweet things are fruits.", answer: "Only conclusion II follows", options: syllogismOptions, correctAnswer: "Only conclusion II follows", explanation: "The second conclusion directly matches 'some fruits are sweet'. The first does not follow definitely.", difficulty: "medium" },
      { question: "Statements: Some books are pens. All pens are tools. Conclusions: I. Some books are tools. II. Some tools are books.", answer: "Both conclusions follow", options: syllogismOptions, correctAnswer: "Both conclusions follow", explanation: "Some books are pens and all pens are tools, so some books are tools. The same relation can be read in reverse as some tools are books.", difficulty: "medium" },
      { question: "Statements: All laptops are devices. Some devices are expensive. Conclusions: I. Some laptops are expensive. II. Some expensive things are devices.", answer: "Only conclusion II follows", options: syllogismOptions, correctAnswer: "Only conclusion II follows", explanation: "We know some devices are expensive, but nothing definite about laptops being expensive.", difficulty: "easy" },
      { question: "Statements: No birds are mammals. All mammals are animals. Conclusions: I. No bird is an animal. II. Some animals are birds.", answer: "Neither conclusion follows", options: syllogismOptions, correctAnswer: "Neither conclusion follows", explanation: "We know birds and mammals do not overlap, but birds can still be animals, and the existence of bird-animals is not guaranteed.", difficulty: "hard" },
      { question: "Statements: Some students are players. All players are athletes. Conclusions: I. Some students are athletes. II. All athletes are players.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "Some students are players and all players are athletes, so some students are athletes. The reverse is not true.", difficulty: "medium" },
      { question: "Statements: All roses are flowers. Some flowers are red. Conclusions: I. Some roses are red. II. Some red things are flowers.", answer: "Only conclusion II follows", options: syllogismOptions, correctAnswer: "Only conclusion II follows", explanation: "The second conclusion directly follows from the statement. The first is not definite.", difficulty: "medium" },
      { question: "Statements: Some men are engineers. All engineers are skilled. Conclusions: I. Some men are skilled. II. Some skilled are men.", answer: "Both conclusions follow", options: syllogismOptions, correctAnswer: "Both conclusions follow", explanation: "Some men are engineers and all engineers are skilled, so some men are skilled. The same relation also gives some skilled are men.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Verbal Reasoning", topic: "statementConclusion" },
    [
      { question: "Statement: The company has announced a new internship program for final-year students. Conclusion: Final-year students can apply for internships.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "The statement directly supports the conclusion.", difficulty: "easy" },
      { question: "Statement: All online orders placed today will be delivered tomorrow. Conclusion: Some orders placed today will arrive tomorrow.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "If all orders will be delivered tomorrow, then some orders placed today will arrive tomorrow.", difficulty: "easy" },
      { question: "Statement: The university has made attendance mandatory for lab sessions. Conclusion: Attendance is optional for lab sessions.", answer: "Neither conclusion follows", options: syllogismOptions, correctAnswer: "Neither conclusion follows", explanation: "The statement says attendance is mandatory, so the conclusion is opposite.", difficulty: "easy" },
      { question: "Statement: The train service has been delayed due to heavy fog. Conclusion: Fog can affect train timings.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "The statement supports the conclusion that fog can affect timings.", difficulty: "medium" },
      { question: "Statement: The startup hired three new developers this month. Conclusion: The startup is expanding its engineering team.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "Hiring developers indicates team expansion.", difficulty: "easy" },
      { question: "Statement: The city has opened more public charging stations for EVs. Conclusion: EV adoption is being encouraged in the city.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "More charging stations are a support measure for EV adoption.", difficulty: "medium" },
      { question: "Statement: The college library is closed on Sundays. Conclusion: The library is open every day.", answer: "Neither conclusion follows", options: syllogismOptions, correctAnswer: "Neither conclusion follows", explanation: "If it is closed on Sundays, it cannot be open every day.", difficulty: "easy" },
      { question: "Statement: The app introduced a dark mode to reduce eye strain. Conclusion: The app is trying to improve user comfort.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "Dark mode is a comfort-related improvement.", difficulty: "easy" },
      { question: "Statement: The company is offering remote work options to employees. Conclusion: Employee flexibility has increased.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "Remote work options increase flexibility.", difficulty: "medium" },
      { question: "Statement: The exam pattern was changed to include more reasoning questions. Conclusion: Analytical preparation has become more important.", answer: "Only conclusion I follows", options: syllogismOptions, correctAnswer: "Only conclusion I follows", explanation: "More reasoning questions naturally require stronger analytical preparation.", difficulty: "medium" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Verbal Reasoning", topic: "statement-assumption" },
    [
      { question: "Statement: Please keep the classroom clean. Assumption I: The classroom can become dirty. Assumption II: Students are responsible for cleaning.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "The request assumes the classroom may become dirty. Responsibility for cleaning is not necessarily assumed.", difficulty: "easy" },
      { question: "Statement: Apply early to avoid last-minute issues. Assumption I: Last-minute issues are possible. Assumption II: Early applications are always rejected.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "The advice assumes late action can cause issues.", difficulty: "medium" },
      { question: "Statement: Buy one, get one free. Assumption I: Customers like free offers. Assumption II: The seller wants to clear stock.", answer: "Both assumptions are implicit", options: assumptionOptions, correctAnswer: "Both assumptions are implicit", explanation: "Both assumptions commonly support such a promotion.", difficulty: "medium" },
      { question: "Statement: The company introduced flexible hours to improve productivity. Assumption I: Flexible hours may improve productivity. Assumption II: Productivity is already high.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "The statement directly assumes a link between flexible hours and productivity.", difficulty: "medium" },
      { question: "Statement: Download the app to track your expenses. Assumption I: Users may want expense tracking. Assumption II: The app is expensive.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "The statement assumes users need expense tracking. App cost is irrelevant.", difficulty: "easy" },
      { question: "Statement: The scholarship is meant for deserving students. Assumption I: Some students may deserve help. Assumption II: All students need scholarships.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "The statement assumes there can be deserving students.", difficulty: "easy" },
      { question: "Statement: Use a helmet while riding a bike. Assumption I: Riding a bike can be risky. Assumption II: All riders already wear helmets.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "Safety advice implies risk.", difficulty: "easy" },
      { question: "Statement: The restaurant added vegan dishes to the menu. Assumption I: There is demand for vegan food. Assumption II: The restaurant removed all non-vegetarian items.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "Adding vegan dishes implies possible demand. Removal of other items is not implied.", difficulty: "medium" },
      { question: "Statement: Please reserve your seat in advance for the workshop. Assumption I: Seats are limited. Assumption II: Everyone will attend.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "Advance reservation usually implies limited seats.", difficulty: "easy" },
      { question: "Statement: The institute launched a placement bootcamp to help students. Assumption I: Students need placement support. Assumption II: All students will get jobs.", answer: "Only assumption I is implicit", options: assumptionOptions, correctAnswer: "Only assumption I is implicit", explanation: "Support programs assume a need for help; guaranteed jobs are not implied.", difficulty: "medium" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Verbal Reasoning", topic: "cause-effect" },
    [
      { question: "Statement I: The roads were flooded. Statement II: Traffic moved slowly. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "Flooded roads generally lead to slow traffic.", difficulty: "easy" },
      { question: "Statement I: The smartphone battery was charged overnight. Statement II: The phone lasted longer during the day. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "A full charge causes longer battery life.", difficulty: "easy" },
      { question: "Statement I: The team practiced daily. Statement II: The team won the tournament. What is the relation?", answer: "Both are independent causes", options: causeEffectOptions, correctAnswer: "Both are independent causes", explanation: "Practice may help, but winning can depend on many factors; the relationship is not definite.", difficulty: "hard" },
      { question: "Statement I: The lights went out. Statement II: The power supply failed. What is the relation?", answer: "Statement II is the cause and I is the effect", options: causeEffectOptions, correctAnswer: "Statement II is the cause and I is the effect", explanation: "Power supply failure causes lights to go out.", difficulty: "easy" },
      { question: "Statement I: The company increased salaries. Statement II: Employee morale improved. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "Higher salaries often improve morale.", difficulty: "medium" },
      { question: "Statement I: It rained heavily. Statement II: The ground became wet. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "Heavy rain causes the ground to become wet.", difficulty: "easy" },
      { question: "Statement I: The meeting was postponed. Statement II: The manager was unavailable. What is the relation?", answer: "Statement II is the cause and I is the effect", options: causeEffectOptions, correctAnswer: "Statement II is the cause and I is the effect", explanation: "Manager unavailability can lead to postponement.", difficulty: "medium" },
      { question: "Statement I: The app crashed repeatedly. Statement II: Users uninstalled it. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "Repeated crashes can cause users to uninstall an app.", difficulty: "medium" },
      { question: "Statement I: The food was overcooked. Statement II: The customer complained. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "Poor food quality can lead to complaints.", difficulty: "easy" },
      { question: "Statement I: The internet was down. Statement II: The video call failed. What is the relation?", answer: "Statement I is the cause and II is the effect", options: causeEffectOptions, correctAnswer: "Statement I is the cause and II is the effect", explanation: "No internet commonly causes video call failure.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Verbal Reasoning", topic: "assertion-reason" },
    [
      { question: "Assertion: A balanced diet helps maintain good health. Reason: It provides essential nutrients required by the body.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "A balanced diet is healthy because it supplies the nutrients the body needs.", difficulty: "easy" },
      { question: "Assertion: Regular practice improves coding speed. Reason: Repetition builds familiarity and reduces hesitation.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "Repetition directly explains improved speed.", difficulty: "easy" },
      { question: "Assertion: Traffic signals are important in cities. Reason: They help control movement and reduce accidents.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "Traffic signals manage traffic and improve safety.", difficulty: "medium" },
      { question: "Assertion: The moon emits its own light. Reason: It reflects sunlight.", answer: "A is false but R is true", options: assertionReasonOptions, correctAnswer: "A is false but R is true", explanation: "The moon does not emit light; it reflects sunlight.", difficulty: "easy" },
      { question: "Assertion: Drinking water before exams improves concentration. Reason: Hydration supports brain function.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "Hydration can help concentration, which explains the assertion.", difficulty: "medium" },
      { question: "Assertion: A vacuum has no matter. Reason: It has no air molecules.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "A vacuum is defined by the absence of matter, including air molecules.", difficulty: "medium" },
      { question: "Assertion: All programming languages are equally easy to learn. Reason: Syntax rules differ across languages.", answer: "A is false but R is true", options: assertionReasonOptions, correctAnswer: "A is false but R is true", explanation: "Languages vary in difficulty, and syntax differences are real.", difficulty: "easy" },
      { question: "Assertion: Hard work is always sufficient for success. Reason: Success also depends on opportunity and strategy.", answer: "A is false but R is true", options: assertionReasonOptions, correctAnswer: "A is false but R is true", explanation: "Hard work helps, but it is not always sufficient on its own.", difficulty: "medium" },
      { question: "Assertion: Plants need sunlight for photosynthesis. Reason: Photosynthesis converts light energy into chemical energy.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "The reason directly explains the assertion.", difficulty: "easy" },
      { question: "Assertion: Time management can reduce stress. Reason: It helps prioritize tasks and avoid last-minute pressure.", answer: "A and R are true and R is the correct explanation of A", options: assertionReasonOptions, correctAnswer: "A and R are true and R is the correct explanation of A", explanation: "Good planning lowers pressure and stress.", difficulty: "medium" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Non-Verbal", topic: "series" },
    [
      { question: "Find the next number in the series: 3, 6, 12, 24, ?", answer: 48, explanation: "Each term is multiplied by 2.", difficulty: "easy" },
      { question: "Find the next number in the series: 2, 5, 10, 17, ?", answer: 26, explanation: "Differences are 3, 5, 7, so next difference is 9.", difficulty: "medium" },
      { question: "Find the next number in the series: 1, 4, 9, 16, ?", answer: 25, explanation: "These are perfect squares: 1^2, 2^2, 3^2, 4^2.", difficulty: "easy" },
      { question: "Find the next number in the series: 5, 10, 20, 40, ?", answer: 80, explanation: "Each term is doubled.", difficulty: "easy" },
      { question: "Find the next number in the series: 7, 14, 28, 56, ?", answer: 112, explanation: "Each term is doubled.", difficulty: "easy" },
      { question: "Find the next number in the series: 4, 9, 16, 25, ?", answer: 36, explanation: "These are consecutive squares.", difficulty: "easy" },
      { question: "Find the next number in the series: 11, 18, 27, 38, ?", answer: 51, explanation: "Differences are 7, 9, 11, so next is 13.", difficulty: "hard" },
      { question: "Find the next number in the series: 1, 1, 2, 3, 5, ?", answer: 8, explanation: "This is the Fibonacci series.", difficulty: "medium" },
      { question: "Find the next number in the series: 100, 90, 81, 73, ?", answer: 66, explanation: "Differences are -10, -9, -8, so next is -7.", difficulty: "medium" },
      { question: "Find the next number in the series: 6, 13, 22, 33, ?", answer: 46, explanation: "Differences are 7, 9, 11, so next difference is 13.", difficulty: "hard" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Coding Logic", topic: "number-series" },
    [
      { question: "What is the next term: 9, 18, 36, 72, ?", answer: 144, explanation: "Each term is doubled.", difficulty: "easy" },
      { question: "What is the next term: 4, 7, 11, 16, ?", answer: 22, explanation: "Differences are 3, 4, 5, so next is 6.", difficulty: "medium" },
      { question: "What is the next term: 2, 6, 12, 20, ?", answer: 30, explanation: "Pattern is n(n+1): 1×2, 2×3, 3×4, 4×5.", difficulty: "medium" },
      { question: "What is the next term: 3, 8, 15, 24, ?", answer: 35, explanation: "Pattern is n^2 + 2n: 1^2+2, 2^2+4, 3^2+6, 4^2+8.", difficulty: "hard" },
      { question: "What is the next term: 10, 20, 35, 55, ?", answer: 80, explanation: "Differences are 10, 15, 20, so next is 25.", difficulty: "medium" },
      { question: "What is the next term: 1, 3, 6, 10, ?", answer: 15, explanation: "These are triangular numbers.", difficulty: "easy" },
      { question: "What is the next term: 12, 24, 48, 96, ?", answer: 192, explanation: "Each term is doubled.", difficulty: "easy" },
      { question: "What is the next term: 5, 11, 19, 29, ?", answer: 41, explanation: "Differences are 6, 8, 10, so next is 12.", difficulty: "medium" },
      { question: "What is the next term: 8, 16, 27, 41, ?", answer: 58, explanation: "Differences are 8, 11, 14, so next is 17.", difficulty: "hard" },
      { question: "What is the next term: 14, 28, 56, 112, ?", answer: 224, explanation: "Each term is doubled.", difficulty: "easy" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Coding Logic", topic: "alphabet-series" },
    [
      { question: "What is the next letter: A, C, E, G, ?", answer: "I", options: ["H", "I", "J", "K"], correctAnswer: "I", explanation: "Every second letter is taken.", difficulty: "easy" },
      { question: "What is the next letter: B, D, G, K, ?", answer: "P", options: ["O", "P", "Q", "R"], correctAnswer: "P", explanation: "The jumps are +2, +3, +4, so next is +5.", difficulty: "medium" },
      { question: "What is the next letter: Z, X, V, T, ?", answer: "R", options: ["Q", "R", "S", "T"], correctAnswer: "R", explanation: "Each time the letter moves back by 2.", difficulty: "easy" },
      { question: "What is the next letter: M, O, R, V, ?", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The pattern adds 2, 3, 4, 5 and wraps around the alphabet.", difficulty: "hard" },
      { question: "What is the next letter: C, F, J, O, ?", answer: "U", options: ["T", "U", "V", "W"], correctAnswer: "U", explanation: "The jumps are +3, +4, +5, so next is +6.", difficulty: "medium" },
      { question: "What is the next letter: H, J, L, N, ?", answer: "P", options: ["O", "P", "Q", "R"], correctAnswer: "P", explanation: "Letters move forward by 2 each time.", difficulty: "easy" },
      { question: "What is the next letter: Q, P, N, K, ?", answer: "G", options: ["F", "G", "H", "I"], correctAnswer: "G", explanation: "The jumps are -1, -2, -3, so next is -4.", difficulty: "medium" },
      { question: "What is the next letter: A, D, H, M, ?", answer: "S", options: ["R", "S", "T", "U"], correctAnswer: "S", explanation: "The jumps are +3, +4, +5, so next is +6.", difficulty: "hard" },
      { question: "What is the next letter: E, H, L, Q, ?", answer: "W", options: ["V", "W", "X", "Y"], correctAnswer: "W", explanation: "The jumps are +3, +4, +5, so next is +6.", difficulty: "medium" },
      { question: "What is the next letter: T, R, O, K, ?", answer: "F", options: ["E", "F", "G", "H"], correctAnswer: "F", explanation: "The jumps are -2, -3, -4, so next is -5.", difficulty: "hard" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Coding Logic", topic: "pattern-logic" },
    [
      { question: "If 2 is coded as 5 and 3 is coded as 10, what is the code for 4 using the same pattern?", answer: 17, explanation: "Pattern is n^2 + 1.", difficulty: "easy" },
      { question: "If 1 is coded as 2, 2 as 4 and 3 as 6, what is the code for 7?", answer: 14, explanation: "Pattern is number × 2.", difficulty: "easy" },
      { question: "If 5 is coded as 11 and 6 as 13, what is the code for 9?", answer: 19, explanation: "Pattern is 2n + 1.", difficulty: "easy" },
      { question: "If a pattern increases by adding consecutive odd numbers, what is the next number after 1, 4, 9, 16?", answer: 25, explanation: "These are perfect squares.", difficulty: "easy" },
      { question: "If 3 -> 8, 4 -> 15, 5 -> 24, what is 6 -> ?", answer: 35, explanation: "Pattern is n^2 - 1.", difficulty: "medium" },
      { question: "If 2 -> 6, 4 -> 20, 6 -> 42, what is 8 -> ?", answer: 72, explanation: "Pattern is n^2 + 2n.", difficulty: "medium" },
      { question: "If 1 -> 3, 2 -> 8, 3 -> 15, what is 4 -> ?", answer: 24, explanation: "Pattern is n^2 + 2n.", difficulty: "medium" },
      { question: "If 10 -> 101, 20 -> 401, 30 -> 901, what is 40 -> ?", answer: 1601, explanation: "Pattern follows n^2 + 1 with concatenation-style outputs; 40 maps to 1601.", difficulty: "hard" },
      { question: "If 7 -> 50 and 8 -> 65, what is 9 -> ?", answer: 82, explanation: "Pattern follows n^2 + 1; 9^2 + 1 = 82.", difficulty: "medium" },
      { question: "If 4 -> 16 and 5 -> 25, what is 6 -> ?", answer: 36, explanation: "The pattern is square of the number.", difficulty: "easy" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Coding Logic", topic: "flowchart-questions" },
    [
      { question: "A flowchart adds 2 to a number and then multiplies by 3. If input is 4, what is the output?", answer: 18, explanation: "(4 + 2) × 3 = 18.", difficulty: "easy" },
      { question: "A flowchart subtracts 1, squares the result, and then adds 5. If input is 6, what is the output?", answer: 30, explanation: "(6 - 1)^2 + 5 = 30.", difficulty: "medium" },
      { question: "A flowchart divides by 2 and then adds 7. If input is 18, what is the output?", answer: 16, explanation: "18 / 2 + 7 = 16.", difficulty: "easy" },
      { question: "A flowchart doubles a number, then subtracts 4. If input is 11, what is the output?", answer: 18, explanation: "11 × 2 - 4 = 18.", difficulty: "easy" },
      { question: "A flowchart takes a number, multiplies by 5 and then subtracts 3. If input is 9, what is the output?", answer: 42, explanation: "9 × 5 - 3 = 42.", difficulty: "easy" },
      { question: "A flowchart adds 10, then halves the result. If input is 14, what is the output?", answer: 12, explanation: "(14 + 10) / 2 = 12.", difficulty: "easy" },
      { question: "A flowchart squares the input and then subtracts 9. If input is 7, what is the output?", answer: 40, explanation: "7^2 - 9 = 40.", difficulty: "medium" },
      { question: "A flowchart adds 3, multiplies by 4 and then subtracts 2. If input is 5, what is the output?", answer: 30, explanation: "(5 + 3) × 4 - 2 = 30.", difficulty: "medium" },
      { question: "A flowchart multiplies by 3 and then adds the original number. If input is 8, what is the output?", answer: 32, explanation: "3 × 8 + 8 = 32.", difficulty: "easy" },
      { question: "A flowchart doubles the input, subtracts 1, and then squares it. If input is 3, what is the output?", answer: 25, explanation: "(3 × 2 - 1)^2 = 25.", difficulty: "medium" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Coding Logic", topic: "coding-decoding" },
    [
      { question: "If CAT is coded as DBU, how is DOG coded?", answer: "EPH", options: ["EOG", "EPH", "EQH", "FQI"], correctAnswer: "EPH", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If PEN is coded as QFO, how is BOOK coded?", answer: "CPPL", options: ["CPPL", "CQQM", "DQQM", "BPPL"], correctAnswer: "CPPL", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If MANGO is coded as NBCHP, how is APPLE coded?", answer: "BQQMF", options: ["BQQMF", "AQPMF", "BPPMF", "CQPMG"], correctAnswer: "BQQMF", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If CODE is coded as DPEF, how is JAVA coded?", answer: "KBWB", options: ["KBWB", "KCWC", "JAVB", "LAXA"], correctAnswer: "KBWB", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If TIME is coded as UJNF, how is WORK coded?", answer: "XPSL", options: ["XPSL", "YQSM", "WQRL", "XQSL"], correctAnswer: "XPSL", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If HOUSE is coded as IPVTF, how is TABLE coded?", answer: "UBCMF", options: ["UBCMF", "VCDMF", "TBCMF", "UBDME"], correctAnswer: "UBCMF", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If TEAM is coded as UFBN, how is GOAL coded?", answer: "HPBM", options: ["HPBM", "GQCM", "HPCM", "IPCN"], correctAnswer: "HPBM", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If BALL is coded as CBMM, how is GAME coded?", answer: "HBNF", options: ["HBNF", "GAMF", "HCMF", "ICNG"], correctAnswer: "HBNF", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If ROAD is coded as SPBE, how is PATH coded?", answer: "QBUI", options: ["QBUI", "PATH", "RBVJ", "QATI"], correctAnswer: "QBUI", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
      { question: "If KEY is coded as LFZ, how is DOOR coded?", answer: "EPPS", options: ["EPPS", "FQPR", "DNNQ", "EQPS"], correctAnswer: "EPPS", explanation: "Each letter is shifted by +1.", difficulty: "easy" },
    ],
  ),
);

const relationOptions = ["Father", "Mother", "Brother", "Sister"];
const directionOptions = ["North-East", "North-West", "South-East", "South-West"];
const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday"];
const clockOptions = ["30 degrees", "60 degrees", "90 degrees", "120 degrees"];
const seatingOptions = ["A", "B", "C", "D"];

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "seating-arrangement" },
    [
      { question: "A sits between B and C. Who is in the middle?", answer: "A", options: seatingOptions, correctAnswer: "A", explanation: "A is explicitly stated to sit between B and C.", difficulty: "easy" },
      { question: "In a row, P is to the left of Q and to the right of R. Who is in the middle?", answer: "P", options: ["P", "Q", "R", "S"], correctAnswer: "P", explanation: "The order is R - P - Q.", difficulty: "easy" },
      { question: "Five friends are seated in a row. If X is left of Y and right of Z, who is in the middle among these three?", answer: "X", options: ["X", "Y", "Z", "Cannot be determined"], correctAnswer: "X", explanation: "X lies between Y and Z.", difficulty: "easy" },
      { question: "In a circular table, A sits opposite B. If C sits next to A, who is opposite C?", answer: "Cannot be determined", options: ["A", "B", "Cannot be determined", "C"], correctAnswer: "Cannot be determined", explanation: "One more seat placement is needed to fix opposite to C.", difficulty: "hard" },
      { question: "If M is to the immediate left of N and N is to the immediate left of O, who is in the middle?", answer: "N", options: ["M", "N", "O", "None"], correctAnswer: "N", explanation: "The order is M - N - O.", difficulty: "easy" },
      { question: "R is between S and T. If S is at the left end, who is at the right end?", answer: "T", options: ["R", "S", "T", "Cannot be determined"], correctAnswer: "T", explanation: "The order is S - R - T.", difficulty: "easy" },
      { question: "If A is to the immediate right of B and left of C, who is second from the left in B-A-C order?", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The order is B - A - C.", difficulty: "easy" },
      { question: "In a line, K is placed between L and M, and L is to the left of K. Who is to the right of K?", answer: "M", options: ["L", "M", "K", "Cannot be determined"], correctAnswer: "M", explanation: "If K is between L and M and L is left of K, M is right of K.", difficulty: "medium" },
      { question: "If P is third from the left in a 5-person row, what is its position from the right?", answer: 3, explanation: "Third from the left in a 5-person row is also third from the right.", difficulty: "easy" },
      { question: "In a circular arrangement, each person faces the center. If A is immediately right of B, who is immediately left of B?", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "For people facing the center, immediate right of B is immediate left of B's neighbor in the circle. Here A is the person immediately right of B, so A is also immediately left of B on the circle.", difficulty: "medium" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "blood-relations" },
    [
      { question: "Pointing to a woman, Rahul said, 'She is the mother of my father.' Who is she?", answer: "Grandmother", options: ["Mother", "Grandmother", "Aunt", "Sister"], correctAnswer: "Grandmother", explanation: "Mother of my father is the paternal grandmother.", difficulty: "easy" },
      { question: "A says, 'B is my father's sister.' How is B related to A?", answer: "Aunt", options: ["Aunt", "Mother", "Sister", "Cousin"], correctAnswer: "Aunt", explanation: "Father's sister is aunt.", difficulty: "easy" },
      { question: "P says, 'Q is the son of my sister.' How is Q related to P?", answer: "Nephew", options: ["Nephew", "Son", "Brother", "Cousin"], correctAnswer: "Nephew", explanation: "Son of my sister is nephew.", difficulty: "easy" },
      { question: "R says, 'S is the wife of my brother.' How is S related to R?", answer: "Sister-in-law", options: ["Sister", "Mother", "Sister-in-law", "Daughter"], correctAnswer: "Sister-in-law", explanation: "Brother's wife is sister-in-law.", difficulty: "easy" },
      { question: "T says, 'U is the brother of my mother.' How is U related to T?", answer: "Maternal uncle", options: ["Father", "Maternal uncle", "Brother", "Cousin"], correctAnswer: "Maternal uncle", explanation: "Mother's brother is maternal uncle.", difficulty: "easy" },
      { question: "V says, 'W is the daughter of my uncle.' How is W related to V?", answer: "Cousin", options: ["Cousin", "Aunt", "Sister", "Niece"], correctAnswer: "Cousin", explanation: "Uncle's daughter is cousin.", difficulty: "easy" },
      { question: "X says, 'Y is the son of my grandfather.' How is Y related to X?", answer: "Father or uncle", options: ["Father or uncle", "Brother", "Nephew", "Son"], correctAnswer: "Father or uncle", explanation: "Son of grandfather can be father or uncle.", difficulty: "medium" },
      { question: "Z says, 'The father of my daughter is R.' How is R related to Z?", answer: "Husband", options: ["Brother", "Husband", "Son", "Uncle"], correctAnswer: "Husband", explanation: "Father of my daughter is the husband.", difficulty: "easy" },
      { question: "A says, 'B is the only son of my mother.' How is B related to A?", answer: "Brother", options: ["Brother", "Father", "Uncle", "Cousin"], correctAnswer: "Brother", explanation: "Only son of my mother is my brother.", difficulty: "easy" },
      { question: "C says, 'D is my mother's mother.' Who is D?", answer: "Grandmother", options: ["Aunt", "Grandmother", "Mother", "Sister"], correctAnswer: "Grandmother", explanation: "Mother's mother is grandmother.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "direction-sense" },
    [
      { question: "A walks 5 km north and then 3 km east. In which direction is he from the starting point?", answer: "North-East", options: directionOptions, correctAnswer: "North-East", explanation: "North and east together indicate north-east.", difficulty: "easy" },
      { question: "A person walks 4 km west and 4 km south. In which direction is the final point from the start?", answer: "South-West", options: directionOptions, correctAnswer: "South-West", explanation: "West and south together indicate south-west.", difficulty: "easy" },
      { question: "A moves 6 km east, then 2 km west, then 3 km east. How far is he from the start?", answer: 7, explanation: "Net east = 6 - 2 + 3 = 7 km.", difficulty: "easy" },
      { question: "A walks 10 km north, then 6 km south. How far is he from the start?", answer: 4, explanation: "Net north = 4 km.", difficulty: "easy" },
      { question: "A goes 2 km north, 2 km east, 2 km south. Which direction is he from the starting point?", answer: "East", options: ["North", "South", "East", "West"], correctAnswer: "East", explanation: "North and south cancel out, leaving east.", difficulty: "medium" },
      { question: "A walks 3 km south, 4 km west and 5 km north. Where is he relative to the start?", answer: "North-West", options: directionOptions, correctAnswer: "North-West", explanation: "Net movement is 2 km north and 4 km west.", difficulty: "medium" },
      { question: "A person faces east and turns right, then right again. Which direction is he facing?", answer: "West", options: ["North", "South", "East", "West"], correctAnswer: "West", explanation: "East -> South -> West.", difficulty: "easy" },
      { question: "A person faces north, turns 90° clockwise, then 180° anticlockwise. Which direction is he facing?", answer: "West", options: ["North", "South", "East", "West"], correctAnswer: "West", explanation: "North -> East -> West.", difficulty: "medium" },
      { question: "A walks 8 km north-east. How can his direction be described?", answer: "North-East", options: directionOptions, correctAnswer: "North-East", explanation: "North-east is the direction itself.", difficulty: "easy" },
      { question: "A moves 5 km east and 12 km north. What is the shortest distance from the start? (Use integer approximation)", answer: 13, explanation: "It forms a 5-12-13 right triangle, so the distance is 13 km.", difficulty: "medium" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "calendar" },
    [
      { question: "If 1 January is Monday, what day will 8 January be?", answer: "Monday", options: dayOptions, correctAnswer: "Monday", explanation: "8 January is 7 days after 1 January.", difficulty: "easy" },
      { question: "If 10 March is Wednesday, what day will 17 March be?", answer: "Wednesday", options: dayOptions, correctAnswer: "Wednesday", explanation: "A week later, the day repeats.", difficulty: "easy" },
      { question: "What day of the week comes 2 days after Thursday?", answer: "Saturday", options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday", explanation: "Thursday + 2 days = Saturday.", difficulty: "easy" },
      { question: "If today is Tuesday, what day was it 3 days ago?", answer: "Saturday", options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday", explanation: "Tuesday - 3 days = Saturday.", difficulty: "easy" },
      { question: "If 15 August 2024 is Thursday, what day will 22 August 2024 be?", answer: "Thursday", options: dayOptions, correctAnswer: "Thursday", explanation: "It is exactly one week later.", difficulty: "easy" },
      { question: "How many odd days are there in a normal year?", answer: 1, explanation: "A normal year has 365 days = 52 weeks and 1 odd day.", difficulty: "easy" },
      { question: "How many odd days are there in a leap year?", answer: 2, explanation: "A leap year has 366 days = 52 weeks and 2 odd days.", difficulty: "easy" },
      { question: "If 1 May is Sunday, what day will 15 May be?", answer: "Sunday", options: dayOptions, correctAnswer: "Sunday", explanation: "15 May is 14 days later.", difficulty: "easy" },
      { question: "If 1 February is Monday in a non-leap year, what day will 1 March be?", answer: "Monday", options: dayOptions, correctAnswer: "Monday", explanation: "February has 28 days in a non-leap year, so the weekday repeats.", difficulty: "medium" },
      { question: "If 31 December is Friday, what day is 1 January of the next year?", answer: "Saturday", options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday", explanation: "The next day after Friday is Saturday.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "clock-problems" },
    [
      { question: "What is the angle between the hour and minute hand at 3:00?", answer: 90, explanation: "At 3:00, the hands are perpendicular.", difficulty: "easy" },
      { question: "What is the angle between the hands at 6:00?", answer: 180, explanation: "At 6:00, the hands are opposite each other.", difficulty: "easy" },
      { question: "What is the angle between the hands at 12:00?", answer: 0, explanation: "At 12:00, both hands overlap.", difficulty: "easy" },
      { question: "If it is 2:30, which option best describes the angle between hands?", answer: "15 degrees", options: clockOptions, correctAnswer: "15 degrees", explanation: "At 2:30 the angle is 15 degrees.", difficulty: "medium" },
      { question: "What is the angle between hands at 4:00?", answer: 120, explanation: "Each hour mark is 30 degrees, so 4 × 30 = 120 degrees.", difficulty: "easy" },
      { question: "At 9:00, what is the angle between the hands?", answer: 90, explanation: "9 × 30 = 270, but the smaller angle is 90 degrees.", difficulty: "easy" },
      { question: "If the time is 1:00, what is the angle between the hands?", answer: 30, explanation: "One hour mark = 30 degrees.", difficulty: "easy" },
      { question: "What is the angle between the hands at 5:00?", answer: 150, explanation: "5 × 30 = 150 degrees.", difficulty: "medium" },
      { question: "At 8:00, what is the angle between the hands?", answer: 120, explanation: "8 × 30 = 240, so the smaller angle is 120 degrees.", difficulty: "easy" },
      { question: "At 7:00, what is the angle between the hands?", answer: 150, explanation: "7 × 30 = 210, so the smaller angle is 150 degrees.", difficulty: "easy" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Analytical", topic: "puzzle-tests" },
    [
      { question: "Three friends A, B and C sit in a row. A is left of B and B is left of C. Who sits in the middle?", answer: "B", options: ["A", "B", "C", "Cannot be determined"], correctAnswer: "B", explanation: "The order is A - B - C.", difficulty: "easy" },
      { question: "Four people are standing in a queue. If D is at the front and A is behind B, who can be at the second position?", answer: "B", options: ["A", "B", "C", "D"], correctAnswer: "B", explanation: "B must be ahead of A; a simple arrangement gives B in the second position.", difficulty: "medium" },
      { question: "A, B, C and D sit around a table. If A is opposite C and B is opposite D, who sits opposite A?", answer: "C", options: ["A", "B", "C", "D"], correctAnswer: "C", explanation: "A is opposite C by definition.", difficulty: "easy" },
      { question: "In a puzzle, each person likes one fruit. If A likes apple and B likes banana, who likes apple?", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The statement directly says A likes apple.", difficulty: "easy" },
      { question: "If a box contains red, blue and green balls and the blue ball is removed, which colors remain?", answer: "Red and Green", options: ["Red and Blue", "Blue and Green", "Red and Green", "All three"], correctAnswer: "Red and Green", explanation: "Blue is removed, leaving red and green.", difficulty: "easy" },
      { question: "A puzzle says X is taller than Y and shorter than Z. Who is tallest?", answer: "Z", options: ["X", "Y", "Z", "Cannot be determined"], correctAnswer: "Z", explanation: "Z is taller than X, and X is taller than Y.", difficulty: "easy" },
      { question: "If P is older than Q and Q is older than R, who is the youngest?", answer: "R", options: ["P", "Q", "R", "Cannot be determined"], correctAnswer: "R", explanation: "P > Q > R, so R is youngest.", difficulty: "easy" },
      { question: "In a puzzle, a key is kept inside a drawer, and the drawer is inside a table. Where is the key?", answer: "Inside the table", options: ["Inside the chair", "Inside the table", "On the floor", "Cannot be determined"], correctAnswer: "Inside the table", explanation: "The key is nested inside the drawer, which is inside the table.", difficulty: "medium" },
      { question: "If every student in a group has a badge and Rahul is a student, what can be concluded?", answer: "Rahul has a badge", options: ["Rahul has a badge", "Rahul has no badge", "Cannot be determined", "Rahul is not a student"], correctAnswer: "Rahul has a badge", explanation: "The statement applies to every student.", difficulty: "easy" },
      { question: "A puzzle gives three clues and only one fits all clues. If the clues are satisfied by option C, what is the answer?", answer: "C", options: ["A", "B", "C", "D"], correctAnswer: "C", explanation: "The only fitting option is C.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Non-Verbal", topic: "mirror-image" },
    [
      { question: "What is the mirror image of the word CAT?", answer: "TAC", options: ["TAC", "CAT", "ACT", "TCA"], correctAnswer: "TAC", explanation: "A mirror image reverses the order.", difficulty: "easy" },
      { question: "What is the mirror image of the word PEN?", answer: "NEP", options: ["NEP", "PEN", "EPN", "NPE"], correctAnswer: "NEP", explanation: "Mirror image reverses the order of letters.", difficulty: "easy" },
      { question: "What is the mirror image of the word DOG?", answer: "GOD", options: ["GOD", "DOG", "OGD", "GDO"], correctAnswer: "GOD", explanation: "The order of letters reverses.", difficulty: "easy" },
      { question: "What is the mirror image of the word HOME?", answer: "EMOH", options: ["EMOH", "HOME", "EOMH", "MEOH"], correctAnswer: "EMOH", explanation: "Mirror image is the reversed order.", difficulty: "easy" },
      { question: "What is the mirror image of the word TEAM?", answer: "MAET", options: ["MAET", "TEAM", "META", "TAEM"], correctAnswer: "MAET", explanation: "Mirror image reverses the word.", difficulty: "easy" },
      { question: "What is the mirror image of the word BOOK?", answer: "KOOB", options: ["KOOB", "BOOK", "KOBO", "OKOB"], correctAnswer: "KOOB", explanation: "Letters appear in reverse order.", difficulty: "easy" },
      { question: "What is the mirror image of the word CODE?", answer: "EDOC", options: ["EDOC", "CODE", "ECDO", "ODCE"], correctAnswer: "EDOC", explanation: "Mirror image reverses the sequence.", difficulty: "easy" },
      { question: "What is the mirror image of the word JAVA?", answer: "AVAJ", options: ["AVAJ", "JAVA", "AJVA", "VAJA"], correctAnswer: "AVAJ", explanation: "The word is reversed.", difficulty: "easy" },
      { question: "What is the mirror image of the word MATH?", answer: "HTAM", options: ["HTAM", "MATH", "ATMH", "HATM"], correctAnswer: "HTAM", explanation: "Mirror image is the reversed order.", difficulty: "easy" },
      { question: "What is the mirror image of the word TOP?", answer: "POT", options: ["POT", "TOP", "OTP", "PTO"], correctAnswer: "POT", explanation: "Mirror image reverses the letters.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Non-Verbal", topic: "water-image" },
    [
      { question: "What is the water image of the word CAT?", answer: "TAC", options: ["TAC", "CAT", "ACT", "TCA"], correctAnswer: "TAC", explanation: "In this text-based seed, the water image is represented by the reversed order.", difficulty: "easy" },
      { question: "What is the water image of the word PEN?", answer: "NEP", options: ["NEP", "PEN", "EPN", "NPE"], correctAnswer: "NEP", explanation: "The order is reversed for the water image style question.", difficulty: "easy" },
      { question: "What is the water image of the word DOG?", answer: "GOD", options: ["GOD", "DOG", "OGD", "GDO"], correctAnswer: "GOD", explanation: "The text-based water image uses reversed order.", difficulty: "easy" },
      { question: "What is the water image of the word HOME?", answer: "EMOH", options: ["EMOH", "HOME", "EOMH", "MEOH"], correctAnswer: "EMOH", explanation: "Reversing the order gives the expected image.", difficulty: "easy" },
      { question: "What is the water image of the word TEAM?", answer: "MAET", options: ["MAET", "TEAM", "META", "TAEM"], correctAnswer: "MAET", explanation: "The order is reversed.", difficulty: "easy" },
      { question: "What is the water image of the word BOOK?", answer: "KOOB", options: ["KOOB", "BOOK", "KOBO", "OKOB"], correctAnswer: "KOOB", explanation: "Reversed order gives the water image representation.", difficulty: "easy" },
      { question: "What is the water image of the word CODE?", answer: "EDOC", options: ["EDOC", "CODE", "ECDO", "ODCE"], correctAnswer: "EDOC", explanation: "Reversed order is used in this seed representation.", difficulty: "easy" },
      { question: "What is the water image of the word JAVA?", answer: "AVAJ", options: ["AVAJ", "JAVA", "AJVA", "VAJA"], correctAnswer: "AVAJ", explanation: "Reverse the letters.", difficulty: "easy" },
      { question: "What is the water image of the word MATH?", answer: "HTAM", options: ["HTAM", "MATH", "ATMH", "HATM"], correctAnswer: "HTAM", explanation: "The text representation reverses the sequence.", difficulty: "easy" },
      { question: "What is the water image of the word TOP?", answer: "POT", options: ["POT", "TOP", "OTP", "PTO"], correctAnswer: "POT", explanation: "Reversed order.", difficulty: "easy" },
    ],
    true,
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Non-Verbal", topic: "paper-folding" },
    [
      { question: "A square paper is folded once and one hole is punched at the center. How many holes appear after unfolding?", answer: 2, explanation: "One fold creates two layers, so the punch appears as two holes.", difficulty: "easy" },
      { question: "A paper is folded twice and punched once. How many holes appear after unfolding?", answer: 4, explanation: "Two folds create four layers.", difficulty: "easy" },
      { question: "A paper is folded three times and punched once. How many holes appear after unfolding?", answer: 8, explanation: "Three folds create eight layers.", difficulty: "easy" },
      { question: "If a paper is folded once along the middle and a single hole is punched, how many identical holes will appear?", answer: 2, explanation: "One fold doubles the punch marks.", difficulty: "easy" },
      { question: "If a paper is folded twice and then cut once, how many cut marks appear after unfolding?", answer: 4, explanation: "Each fold doubles the number of cut marks.", difficulty: "easy" },
      { question: "A sheet is folded three times and one corner is cut off. How many corners are cut after unfolding?", answer: 8, explanation: "Three folds create eight mirrored cut points.", difficulty: "medium" },
      { question: "If a paper is folded once vertically and once horizontally, how many sections are formed?", answer: 4, explanation: "Two perpendicular folds divide the sheet into four parts.", difficulty: "easy" },
      { question: "A paper folded once has one circle punched at the center. How many circles appear after unfolding?", answer: 2, explanation: "The hole appears twice because of the fold.", difficulty: "easy" },
      { question: "A paper folded twice has one star punched at the center. How many stars appear after unfolding?", answer: 4, explanation: "Two folds create four identical marks.", difficulty: "easy" },
      { question: "A sheet folded three times and punched once will show how many punches?", answer: 8, explanation: "Three folds create 2^3 = 8 punches after unfolding.", difficulty: "easy" },
    ],
  ),
);

logical.push(
  ...buildTopicQuestions(
    { category: "logical", group: "Non-Verbal", topic: "embedded-figures" },
    [
      { question: "Which option contains a triangle inside a square? Assume option A has it.", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The seed question states that option A contains the embedded triangle.", difficulty: "easy" },
      { question: "Which option contains a circle inside a rectangle? Assume option B has it.", answer: "B", options: ["A", "B", "C", "D"], correctAnswer: "B", explanation: "The indicated embedded figure is in option B.", difficulty: "easy" },
      { question: "Which option contains a smaller square inside a larger triangle? Assume option C has it.", answer: "C", options: ["A", "B", "C", "D"], correctAnswer: "C", explanation: "Option C is the correct embedded figure.", difficulty: "easy" },
      { question: "Which option hides the letter A within a pattern? Assume option D has it.", answer: "D", options: ["A", "B", "C", "D"], correctAnswer: "D", explanation: "The embedded letter is in option D.", difficulty: "easy" },
      { question: "Which option contains a star inside a hexagon? Assume option A has it.", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The figure is embedded in option A.", difficulty: "easy" },
      { question: "Which option contains a small arrow inside a circle? Assume option B has it.", answer: "B", options: ["A", "B", "C", "D"], correctAnswer: "B", explanation: "Option B carries the hidden arrow.", difficulty: "easy" },
      { question: "Which option contains a diamond inside a square? Assume option C has it.", answer: "C", options: ["A", "B", "C", "D"], correctAnswer: "C", explanation: "Option C is the embedded figure.", difficulty: "easy" },
      { question: "Which option contains a plus sign inside a triangle? Assume option D has it.", answer: "D", options: ["A", "B", "C", "D"], correctAnswer: "D", explanation: "The embedded figure is located in option D.", difficulty: "easy" },
      { question: "Which option contains a tiny square in a larger circle? Assume option A has it.", answer: "A", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "The hidden figure is in option A.", difficulty: "easy" },
      { question: "Which option contains a triangle embedded in a rectangle? Assume option B has it.", answer: "B", options: ["A", "B", "C", "D"], correctAnswer: "B", explanation: "The correct embedded figure is option B.", difficulty: "easy" },
    ],
  ),
);

const verbal = [];
const tenseOptions = ["go", "goes", "went", "going"];
const articleOptions = ["a", "an", "the", "no article"];
const prepositionOptions = ["in", "on", "at", "for"];
const errorOptions = ["Part A", "Part B", "Part C", "No error"];
const voiceOptions = [
  "A letter is written by her.",
  "A letter was written by her.",
  "She wrote the letter.",
  "The letter has wrote by her.",
];
const speechOptions = [
  "He said that he was tired.",
  "He says that he was tired.",
  "He said that I am tired.",
  "He said that he is tired.",
];

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "tenses" },
    [
      { question: "She ___ to school every day.", answer: "goes", options: tenseOptions, correctAnswer: "goes", explanation: "With 'she' and habitual action, the simple present tense 'goes' is correct.", difficulty: "easy" },
      { question: "They ___ the match yesterday.", answer: "won", options: ["win", "wins", "won", "winning"], correctAnswer: "won", explanation: "Yesterday indicates past tense.", difficulty: "easy" },
      { question: "I ___ my assignment by tonight.", answer: "will finish", options: ["finish", "finishes", "will finish", "finished"], correctAnswer: "will finish", explanation: "By tonight refers to future completion.", difficulty: "easy" },
      { question: "By the time we arrived, they ___ the meeting.", answer: "had started", options: ["start", "started", "had started", "have started"], correctAnswer: "had started", explanation: "Past perfect is used for an action completed before another past action.", difficulty: "medium" },
      { question: "He ___ dinner when the phone rang.", answer: "was having", options: ["has", "was having", "had", "is having"], correctAnswer: "was having", explanation: "An ongoing past action uses past continuous.", difficulty: "medium" },
      { question: "If it rains, we ___ inside.", answer: "will stay", options: ["stay", "stayed", "will stay", "staying"], correctAnswer: "will stay", explanation: "First conditional uses 'will'.", difficulty: "medium" },
      { question: "The train ___ at 6:30 every morning.", answer: "leaves", options: ["leave", "leaves", "left", "leaving"], correctAnswer: "leaves", explanation: "Third-person singular in the present simple is 'leaves'.", difficulty: "easy" },
      { question: "We ___ English for three years.", answer: "have studied", options: ["study", "studied", "have studied", "had studied"], correctAnswer: "have studied", explanation: "Present perfect is used for an action continuing over time.", difficulty: "medium" },
      { question: "The sun ___ in the east.", answer: "rises", options: ["rise", "rises", "rose", "rising"], correctAnswer: "rises", explanation: "A universal truth uses the simple present.", difficulty: "easy" },
      { question: "They ___ working on the project since morning.", answer: "have been", options: ["are", "have been", "were", "had been"], correctAnswer: "have been", explanation: "Present perfect continuous fits 'since morning'.", difficulty: "hard" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "articles" },
    [
      { question: "He is ___ honest boy.", answer: "an", options: articleOptions, correctAnswer: "an", explanation: "Honest begins with a silent 'h', so 'an' is used.", difficulty: "easy" },
      { question: "Please pass me ___ salt.", answer: "the", options: articleOptions, correctAnswer: "the", explanation: "For a specific item like salt on the table, 'the' is used.", difficulty: "easy" },
      { question: "She bought ___ umbrella.", answer: "an", options: articleOptions, correctAnswer: "an", explanation: "Umbrella begins with a vowel sound.", difficulty: "easy" },
      { question: "We visited ___ Taj Mahal last year.", answer: "the", options: articleOptions, correctAnswer: "the", explanation: "Names of famous monuments usually take 'the'.", difficulty: "easy" },
      { question: "He wants to become ___ engineer.", answer: "an", options: articleOptions, correctAnswer: "an", explanation: "Engineer begins with a vowel sound.", difficulty: "easy" },
      { question: "I saw ___ bird on the tree.", answer: "a", options: articleOptions, correctAnswer: "a", explanation: "A general singular countable noun uses 'a'.", difficulty: "easy" },
      { question: "___ Himalayas are beautiful.", answer: "the", options: articleOptions, correctAnswer: "the", explanation: "Plural mountain ranges commonly take 'the'.", difficulty: "medium" },
      { question: "She is ___ best student in the class.", answer: "the", options: articleOptions, correctAnswer: "the", explanation: "Superlatives take 'the'.", difficulty: "easy" },
      { question: "He is ___ MBA graduate.", answer: "an", options: articleOptions, correctAnswer: "an", explanation: "MBA is pronounced with a vowel sound at the start.", difficulty: "medium" },
      { question: "This is ___ unique opportunity.", answer: "a", options: articleOptions, correctAnswer: "a", explanation: "Unique begins with a consonant sound 'yoo'.", difficulty: "hard" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "prepositions" },
    [
      { question: "He is good ___ mathematics.", answer: "at", options: prepositionOptions, correctAnswer: "at", explanation: "The correct phrase is 'good at'.", difficulty: "easy" },
      { question: "She lives ___ Delhi.", answer: "in", options: prepositionOptions, correctAnswer: "in", explanation: "Cities usually take 'in'.", difficulty: "easy" },
      { question: "The book is ___ the table.", answer: "on", options: prepositionOptions, correctAnswer: "on", explanation: "Something resting on a surface uses 'on'.", difficulty: "easy" },
      { question: "He will finish the work ___ two hours.", answer: "in", options: prepositionOptions, correctAnswer: "in", explanation: "A duration in the future uses 'in'.", difficulty: "easy" },
      { question: "The meeting is ___ Monday.", answer: "on", options: prepositionOptions, correctAnswer: "on", explanation: "Days of the week take 'on'.", difficulty: "easy" },
      { question: "She has been waiting ___ 9 AM.", answer: "since", options: ["since", "for", "at", "by"], correctAnswer: "since", explanation: "A starting point in time uses 'since'.", difficulty: "medium" },
      { question: "We traveled ___ train.", answer: "by", options: ["by", "with", "on", "in"], correctAnswer: "by", explanation: "Modes of transport commonly take 'by'.", difficulty: "easy" },
      { question: "The children jumped ___ the pool.", answer: "into", options: ["into", "on", "at", "for"], correctAnswer: "into", explanation: "Movement from outside to inside uses 'into'.", difficulty: "medium" },
      { question: "He apologized ___ being late.", answer: "for", options: prepositionOptions, correctAnswer: "for", explanation: "The phrase is 'apologized for'.", difficulty: "easy" },
      { question: "She is interested ___ coding.", answer: "in", options: prepositionOptions, correctAnswer: "in", explanation: "The phrase is 'interested in'.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "error-detection" },
    [
      { question: "Identify the part with error: 'He do not like coffee.'", answer: "Part A", options: errorOptions, correctAnswer: "Part A", explanation: "It should be 'does not'.", difficulty: "easy" },
      { question: "Identify the part with error: 'She has went to market.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'has gone'.", difficulty: "easy" },
      { question: "Identify the part with error: 'Each of the boys have a pen.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'has' because 'each' is singular.", difficulty: "medium" },
      { question: "Identify the part with error: 'Neither of them are ready.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'is ready' or 'neither of them is ready'.", difficulty: "medium" },
      { question: "Identify the part with error: 'The team are playing well.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "In formal English, 'team' is treated as singular here.", difficulty: "hard" },
      { question: "Identify the part with error: 'He did not went there.'", answer: "Part C", options: errorOptions, correctAnswer: "Part C", explanation: "After 'did not', the base form 'go' should be used.", difficulty: "easy" },
      { question: "Identify the part with error: 'There is many reasons to stay.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'There are many reasons'.", difficulty: "easy" },
      { question: "Identify the part with error: 'The flowers smells good.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'smell' because plural noun takes plural verb.", difficulty: "easy" },
      { question: "Identify the part with error: 'One of the student were absent.'", answer: "Part C", options: errorOptions, correctAnswer: "Part C", explanation: "It should be 'students were absent' or 'student was absent'.", difficulty: "medium" },
      { question: "Identify the part with error: 'She is senior than me.'", answer: "Part B", options: errorOptions, correctAnswer: "Part B", explanation: "It should be 'senior to me'.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "active-passive-voice" },
    [
      { question: "Change to passive voice: 'She writes a letter.'", answer: "A letter is written by her.", options: voiceOptions, correctAnswer: "A letter is written by her.", explanation: "Present simple active becomes passive with 'is written'.", difficulty: "easy" },
      { question: "Change to passive voice: 'They made a mistake.'", answer: "A mistake was made by them.", options: ["A mistake was made by them.", "A mistake is made by them.", "They are making a mistake.", "A mistake had been made by them."], correctAnswer: "A mistake was made by them.", explanation: "Simple past active becomes passive with 'was made'.", difficulty: "easy" },
      { question: "Change to passive voice: 'The teacher is teaching grammar.'", answer: "Grammar is being taught by the teacher.", options: ["Grammar is being taught by the teacher.", "Grammar was taught by the teacher.", "Grammar has taught by the teacher.", "The teacher teaches grammar."], correctAnswer: "Grammar is being taught by the teacher.", explanation: "Present continuous active becomes passive with 'is being taught'.", difficulty: "medium" },
      { question: "Change to passive voice: 'They will complete the project.'", answer: "The project will be completed by them.", options: ["The project will be completed by them.", "The project is completed by them.", "The project was completed by them.", "They completed the project."], correctAnswer: "The project will be completed by them.", explanation: "Future simple active becomes passive with 'will be completed'.", difficulty: "easy" },
      { question: "Change to passive voice: 'She has finished the work.'", answer: "The work has been finished by her.", options: ["The work has been finished by her.", "The work is finished by her.", "The work was finished by her.", "The work had finished by her."], correctAnswer: "The work has been finished by her.", explanation: "Present perfect active becomes passive with 'has been finished'.", difficulty: "medium" },
      { question: "Change to passive voice: 'He read the novel.'", answer: "The novel was read by him.", options: ["The novel was read by him.", "The novel is read by him.", "The novel has read by him.", "The novel was reading by him."], correctAnswer: "The novel was read by him.", explanation: "Simple past active becomes passive.", difficulty: "easy" },
      { question: "Change to passive voice: 'The police caught the thief.'", answer: "The thief was caught by the police.", options: ["The thief was caught by the police.", "The thief is caught by the police.", "The thief caught by the police.", "The thief had caught by the police."], correctAnswer: "The thief was caught by the police.", explanation: "Simple past passive uses 'was caught'.", difficulty: "easy" },
      { question: "Change to passive voice: 'The company is launching a new app.'", answer: "A new app is being launched by the company.", options: ["A new app is being launched by the company.", "A new app was launched by the company.", "A new app has launched by the company.", "A new app is launched by the company."], correctAnswer: "A new app is being launched by the company.", explanation: "Present continuous active becomes passive with 'is being launched'.", difficulty: "medium" },
      { question: "Change to passive voice: 'We support the team.'", answer: "The team is supported by us.", options: ["The team is supported by us.", "The team was supported by us.", "The team supports us.", "The team has been supported by us."], correctAnswer: "The team is supported by us.", explanation: "Present simple active becomes passive.", difficulty: "easy" },
      { question: "Change to passive voice: 'He is solving the problem.'", answer: "The problem is being solved by him.", options: ["The problem is being solved by him.", "The problem was solved by him.", "The problem is solved by him.", "The problem has been solved by him."], correctAnswer: "The problem is being solved by him.", explanation: "Present continuous active becomes passive.", difficulty: "medium" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Grammar", topic: "direct-indirect-speech" },
    [
      { question: "Convert to indirect speech: He said, 'I am tired.'", answer: "He said that he was tired.", options: speechOptions, correctAnswer: "He said that he was tired.", explanation: "Present tense in direct speech changes to past tense in indirect speech.", difficulty: "easy" },
      { question: "Convert to indirect speech: She said, 'I will call you tomorrow.'", answer: "She said that she would call me tomorrow.", options: ["She said that she would call me tomorrow.", "She said that she will call me tomorrow.", "She says that she would call me tomorrow.", "She said that I will call her tomorrow."], correctAnswer: "She said that she would call me tomorrow.", explanation: "Will changes to would in indirect speech.", difficulty: "medium" },
      { question: "Convert to indirect speech: The teacher said, 'Open your books.'", answer: "The teacher asked us to open our books.", options: ["The teacher asked us to open our books.", "The teacher said that open your books.", "The teacher ordered that open books.", "The teacher asks us to open our books."], correctAnswer: "The teacher asked us to open our books.", explanation: "Imperative sentences are reported with 'asked' or 'ordered' + to-infinitive.", difficulty: "medium" },
      { question: "Convert to indirect speech: He said, 'Where do you live?'", answer: "He asked where I lived.", options: ["He asked where I lived.", "He said where I live.", "He asked where do I live.", "He said where I lived."], correctAnswer: "He asked where I lived.", explanation: "Questions in indirect speech use statement order and tense backshift.", difficulty: "medium" },
      { question: "Convert to indirect speech: She said, 'I have finished my work.'", answer: "She said that she had finished her work.", options: ["She said that she had finished her work.", "She said that she has finished her work.", "She said that she finished her work.", "She said that she will finish her work."], correctAnswer: "She said that she had finished her work.", explanation: "Present perfect changes to past perfect.", difficulty: "easy" },
      { question: "Convert to indirect speech: He said, 'I can help you.'", answer: "He said that he could help me.", options: ["He said that he could help me.", "He said that he can help me.", "He said that he will help me.", "He said that I could help him."], correctAnswer: "He said that he could help me.", explanation: "Can changes to could.", difficulty: "easy" },
      { question: "Convert to indirect speech: She said, 'This is my book.'", answer: "She said that that was her book.", options: ["She said that that was her book.", "She said that this is her book.", "She said that it is her book.", "She said that this was my book."], correctAnswer: "She said that that was her book.", explanation: "This changes to that and present tense changes to past.", difficulty: "hard" },
      { question: "Convert to indirect speech: He said, 'Please sit down.'", answer: "He requested me to sit down.", options: ["He requested me to sit down.", "He said me to sit down.", "He requested that I sit down.", "He said to sit down."], correctAnswer: "He requested me to sit down.", explanation: "Polite request is reported using 'requested ... to'.", difficulty: "medium" },
      { question: "Convert to indirect speech: The girl said, 'I am learning coding.'", answer: "The girl said that she was learning coding.", options: ["The girl said that she was learning coding.", "The girl said that she is learning coding.", "The girl said that I was learning coding.", "The girl said that she will learn coding."], correctAnswer: "The girl said that she was learning coding.", explanation: "Present continuous changes to past continuous.", difficulty: "easy" },
      { question: "Convert to indirect speech: They said, 'We have won the match.'", answer: "They said that they had won the match.", options: ["They said that they had won the match.", "They said that they have won the match.", "They said that we won the match.", "They said that they will win the match."], correctAnswer: "They said that they had won the match.", explanation: "Present perfect changes to past perfect.", difficulty: "easy" },
    ],
    true,
  ),
);

const vocabOptions = (correct, a, b, c) => [correct, a, b, c];

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Vocabulary", topic: "synonyms" },
    [
      { question: "Select the synonym of 'abundant'.", answer: "plentiful", options: vocabOptions("plentiful", "scarce", "tiny", "rare"), correctAnswer: "plentiful", explanation: "'Abundant' means plentiful.", difficulty: "easy" },
      { question: "Select the synonym of 'rapid'.", answer: "fast", options: vocabOptions("fast", "slow", "late", "weak"), correctAnswer: "fast", explanation: "'Rapid' means fast.", difficulty: "easy" },
      { question: "Select the synonym of 'assist'.", answer: "help", options: vocabOptions("help", "avoid", "delay", "reject"), correctAnswer: "help", explanation: "'Assist' means help.", difficulty: "easy" },
      { question: "Select the synonym of 'begin'.", answer: "start", options: vocabOptions("start", "finish", "close", "break"), correctAnswer: "start", explanation: "'Begin' means start.", difficulty: "easy" },
      { question: "Select the synonym of 'courage'.", answer: "bravery", options: vocabOptions("bravery", "fear", "anger", "doubt"), correctAnswer: "bravery", explanation: "'Courage' means bravery.", difficulty: "easy" },
      { question: "Select the synonym of 'calm'.", answer: "peaceful", options: vocabOptions("peaceful", "noisy", "rough", "quick"), correctAnswer: "peaceful", explanation: "'Calm' means peaceful.", difficulty: "easy" },
      { question: "Select the synonym of 'diligent'.", answer: "hardworking", options: vocabOptions("hardworking", "lazy", "careless", "weak"), correctAnswer: "hardworking", explanation: "'Diligent' means hardworking.", difficulty: "medium" },
      { question: "Select the synonym of 'huge'.", answer: "enormous", options: vocabOptions("enormous", "tiny", "small", "short"), correctAnswer: "enormous", explanation: "'Huge' means enormous.", difficulty: "easy" },
      { question: "Select the synonym of 'honest'.", answer: "truthful", options: vocabOptions("truthful", "dishonest", "silent", "angry"), correctAnswer: "truthful", explanation: "'Honest' means truthful.", difficulty: "easy" },
      { question: "Select the synonym of 'rapidly'.", answer: "quickly", options: vocabOptions("quickly", "slowly", "hardly", "rarely"), correctAnswer: "quickly", explanation: "'Rapidly' means quickly.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Vocabulary", topic: "antonyms" },
    [
      { question: "Select the antonym of 'ancient'.", answer: "modern", options: vocabOptions("modern", "old", "aged", "ancient"), correctAnswer: "modern", explanation: "'Ancient' and 'modern' are opposites.", difficulty: "easy" },
      { question: "Select the antonym of 'honest'.", answer: "dishonest", options: vocabOptions("dishonest", "truthful", "loyal", "kind"), correctAnswer: "dishonest", explanation: "'Honest' opposite is dishonest.", difficulty: "easy" },
      { question: "Select the antonym of 'increase'.", answer: "decrease", options: vocabOptions("decrease", "grow", "rise", "expand"), correctAnswer: "decrease", explanation: "'Increase' and 'decrease' are opposites.", difficulty: "easy" },
      { question: "Select the antonym of 'victory'.", answer: "defeat", options: vocabOptions("defeat", "success", "win", "prize"), correctAnswer: "defeat", explanation: "'Victory' opposite is defeat.", difficulty: "easy" },
      { question: "Select the antonym of 'expand'.", answer: "shrink", options: vocabOptions("shrink", "grow", "extend", "spread"), correctAnswer: "shrink", explanation: "'Expand' means enlarge; opposite is shrink.", difficulty: "easy" },
      { question: "Select the antonym of 'transparent'.", answer: "opaque", options: vocabOptions("opaque", "clear", "bright", "soft"), correctAnswer: "opaque", explanation: "'Transparent' opposite is opaque.", difficulty: "medium" },
      { question: "Select the antonym of 'fragile'.", answer: "strong", options: vocabOptions("strong", "weak", "soft", "thin"), correctAnswer: "strong", explanation: "'Fragile' opposite is strong/durable.", difficulty: "medium" },
      { question: "Select the antonym of 'scarce'.", answer: "plentiful", options: vocabOptions("plentiful", "rare", "limited", "small"), correctAnswer: "plentiful", explanation: "'Scarce' means limited; opposite is plentiful.", difficulty: "easy" },
      { question: "Select the antonym of 'polite'.", answer: "rude", options: vocabOptions("rude", "kind", "civil", "gentle"), correctAnswer: "rude", explanation: "'Polite' opposite is rude.", difficulty: "easy" },
      { question: "Select the antonym of 'visible'.", answer: "invisible", options: vocabOptions("invisible", "clear", "open", "obvious"), correctAnswer: "invisible", explanation: "'Visible' opposite is invisible.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Vocabulary", topic: "one-word-substitution" },
    [
      { question: "One word for 'a person who writes books'.", answer: "author", options: vocabOptions("author", "actor", "doctor", "driver"), correctAnswer: "author", explanation: "An author writes books.", difficulty: "easy" },
      { question: "One word for 'a person who loves books'.", answer: "bibliophile", options: vocabOptions("bibliophile", "biologist", "chef", "cyclist"), correctAnswer: "bibliophile", explanation: "A bibliophile is a lover of books.", difficulty: "medium" },
      { question: "One word for 'a place where animals are kept for public viewing'.", answer: "zoo", options: vocabOptions("zoo", "museum", "stadium", "library"), correctAnswer: "zoo", explanation: "Animals are kept in a zoo.", difficulty: "easy" },
      { question: "One word for 'a person who studies the weather'.", answer: "meteorologist", options: vocabOptions("meteorologist", "geologist", "economist", "psychologist"), correctAnswer: "meteorologist", explanation: "A meteorologist studies weather.", difficulty: "medium" },
      { question: "One word for 'a person who can write with both hands'.", answer: "ambidextrous", options: vocabOptions("ambidextrous", "ambitious", "ambiguous", "anonymous"), correctAnswer: "ambidextrous", explanation: "Ambidextrous means using both hands equally well.", difficulty: "medium" },
      { question: "One word for 'a fear of heights'.", answer: "acrophobia", options: vocabOptions("acrophobia", "claustrophobia", "hydrophobia", "xenophobia"), correctAnswer: "acrophobia", explanation: "Acrophobia is fear of heights.", difficulty: "medium" },
      { question: "One word for 'a person who is present everywhere'.", answer: "omnipresent", options: vocabOptions("omnipresent", "omnivorous", "omniscient", "transparent"), correctAnswer: "omnipresent", explanation: "Omnipresent means present everywhere.", difficulty: "hard" },
      { question: "One word for 'a sentence that can have two meanings'.", answer: "ambiguous", options: vocabOptions("ambiguous", "vivid", "simple", "brief"), correctAnswer: "ambiguous", explanation: "Ambiguous means having more than one meaning.", difficulty: "easy" },
      { question: "One word for 'a government by the people'.", answer: "democracy", options: vocabOptions("democracy", "monarchy", "autocracy", "oligarchy"), correctAnswer: "democracy", explanation: "Democracy means government by the people.", difficulty: "easy" },
      { question: "One word for 'a place where coins, medals or artifacts are kept'.", answer: "museum", options: vocabOptions("museum", "archive", "warehouse", "clinic"), correctAnswer: "museum", explanation: "Museums keep collections of artifacts.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Vocabulary", topic: "idioms-phrases" },
    [
      { question: "Meaning of the idiom 'break the ice'.", answer: "start a conversation", options: vocabOptions("start a conversation", "end a meeting", "make a promise", "stay silent"), correctAnswer: "start a conversation", explanation: "It means to ease tension and start conversation.", difficulty: "easy" },
      { question: "Meaning of the idiom 'a blessing in disguise'.", answer: "something good appearing bad at first", options: vocabOptions("something good appearing bad at first", "a hidden problem", "a bad habit", "a loud noise"), correctAnswer: "something good appearing bad at first", explanation: "It refers to something beneficial that first seems unfortunate.", difficulty: "medium" },
      { question: "Meaning of the idiom 'once in a blue moon'.", answer: "very rarely", options: vocabOptions("very rarely", "very often", "every day", "never"), correctAnswer: "very rarely", explanation: "The idiom means seldom.", difficulty: "easy" },
      { question: "Meaning of the idiom 'under the weather'.", answer: "feeling ill", options: vocabOptions("feeling ill", "feeling excited", "being punctual", "being wealthy"), correctAnswer: "feeling ill", explanation: "It means not feeling well.", difficulty: "easy" },
      { question: "Meaning of the idiom 'spill the beans'.", answer: "reveal a secret", options: vocabOptions("reveal a secret", "cook food", "make a mess", "forget something"), correctAnswer: "reveal a secret", explanation: "To spill the beans means to reveal a secret.", difficulty: "medium" },
      { question: "Meaning of the idiom 'beat around the bush'.", answer: "avoid the main topic", options: vocabOptions("avoid the main topic", "hit a target", "move quickly", "speak clearly"), correctAnswer: "avoid the main topic", explanation: "It means to avoid the point.", difficulty: "medium" },
      { question: "Meaning of the idiom 'on cloud nine'.", answer: "very happy", options: vocabOptions("very happy", "very tired", "very angry", "very confused"), correctAnswer: "very happy", explanation: "Cloud nine indicates extreme happiness.", difficulty: "easy" },
      { question: "Meaning of the idiom 'the ball is in your court'.", answer: "it's your turn to act", options: vocabOptions("it's your turn to act", "the game is over", "you lost the ball", "you should wait"), correctAnswer: "it's your turn to act", explanation: "It means the next move is yours.", difficulty: "medium" },
      { question: "Meaning of the idiom 'a piece of cake'.", answer: "very easy", options: vocabOptions("very easy", "very expensive", "very hard", "very noisy"), correctAnswer: "very easy", explanation: "A piece of cake means simple or easy.", difficulty: "easy" },
      { question: "Meaning of the idiom 'call it a day'.", answer: "stop working for now", options: vocabOptions("stop working for now", "start again", "work faster", "finish permanently"), correctAnswer: "stop working for now", explanation: "It means to stop the day's work.", difficulty: "easy" },
    ],
    true,
  ),
);

const clozeOptions = ["maintain", "reduce", "increase", "ignore"];
const improvementOptions = ["I went to the market.", "I go to the market.", "I had went to the market.", "I am going to the market."];
const blankOptions = ["go", "goes", "went", "gone"];
const jumbleOptions = ["1-2-3-4", "2-1-3-4", "3-4-1-2", "4-3-2-1"];
const rcPassage1 =
  "Remote work has changed how many teams operate. Employees save travel time, but managers need better communication tools to keep projects on track.";
const rcPassage2 =
  "Regular exercise improves health, mood, and concentration. Even a short daily walk can help people feel more energetic and focused.";

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Reading", topic: "reading-comprehension" },
    [
      { question: `${rcPassage1} What is one benefit of remote work mentioned in the passage?`, answer: "Employees save travel time.", options: ["Employees save travel time.", "Teams stop communicating.", "Projects finish automatically.", "Managers need no tools."], correctAnswer: "Employees save travel time.", explanation: "The passage directly states that remote work saves travel time.", difficulty: "easy" },
      { question: `${rcPassage1} What do managers need more of according to the passage?`, answer: "Better communication tools.", options: ["Better communication tools.", "Longer holidays.", "More travel time.", "Fewer employees."], correctAnswer: "Better communication tools.", explanation: "The passage says managers need better communication tools.", difficulty: "easy" },
      { question: `${rcPassage1} Which statement best describes the passage?`, answer: "Remote work brings convenience but needs good coordination.", options: ["Remote work brings convenience but needs good coordination.", "Remote work is always unproductive.", "Managers do not matter in remote work.", "Travel time is more important than work."], correctAnswer: "Remote work brings convenience but needs good coordination.", explanation: "This summary matches the passage.", difficulty: "medium" },
      { question: `${rcPassage1} Why is communication important in remote teams?`, answer: "To keep projects on track.", options: ["To keep projects on track.", "To increase travel time.", "To avoid all meetings.", "To reduce teamwork."], correctAnswer: "To keep projects on track.", explanation: "The passage says communication tools help keep projects on track.", difficulty: "easy" },
      { question: `${rcPassage1} Which is a valid inference?`, answer: "Remote teams depend heavily on communication.", options: ["Remote teams depend heavily on communication.", "Remote teams do not need planning.", "Remote work removes all responsibility.", "Managers are unnecessary."], correctAnswer: "Remote teams depend heavily on communication.", explanation: "The passage emphasizes communication tools and project tracking.", difficulty: "medium" },
      { question: `${rcPassage2} What does exercise improve according to the passage?`, answer: "Health, mood, and concentration.", options: ["Health, mood, and concentration.", "Only strength.", "Only sleep.", "Only speed."], correctAnswer: "Health, mood, and concentration.", explanation: "The passage lists these three benefits.", difficulty: "easy" },
      { question: `${rcPassage2} What can even a short daily walk do?`, answer: "Help people feel more energetic and focused.", options: ["Help people feel more energetic and focused.", "Make people lazy.", "Reduce concentration.", "Stop health benefits."], correctAnswer: "Help people feel more energetic and focused.", explanation: "The passage says a short walk can help with energy and focus.", difficulty: "easy" },
      { question: `${rcPassage2} Which statement is supported by the passage?`, answer: "Exercise can improve both body and mind.", options: ["Exercise can improve both body and mind.", "Exercise always requires a gym.", "Walking is harmful.", "Mood never changes."], correctAnswer: "Exercise can improve both body and mind.", explanation: "Health, mood, and concentration are all improved.", difficulty: "medium" },
      { question: `${rcPassage2} What is the main idea of the passage?`, answer: "Regular exercise has multiple benefits.", options: ["Regular exercise has multiple benefits.", "Exercise is only for athletes.", "Walking is unnecessary.", "Concentration cannot be improved."], correctAnswer: "Regular exercise has multiple benefits.", explanation: "The passage focuses on the benefits of exercise.", difficulty: "easy" },
      { question: `${rcPassage2} Which action is mentioned as helpful?`, answer: "A short daily walk.", options: ["A short daily walk.", "Skipping meals.", "Sleeping less.", "Working nonstop."], correctAnswer: "A short daily walk.", explanation: "The passage explicitly mentions a short daily walk.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Reading", topic: "para-jumbles" },
    [
      { question: "Arrange the sentences in the correct order: 1. He picked up his bag. 2. He left the house. 3. He locked the door. 4. He reached the bus stop.", answer: "1-3-2-4", options: jumbleOptions, correctAnswer: "1-3-2-4", explanation: "He picks up the bag, locks the door, leaves the house, and reaches the bus stop.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. She woke up early. 2. She prepared breakfast. 3. She went to office. 4. She attended a meeting.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "This is the natural sequence of events.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. The rain stopped. 2. The sun came out. 3. People went outside. 4. Children started playing.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "The sequence follows the weather change.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. The company announced hiring. 2. Many students applied. 3. Interviews were conducted. 4. New employees joined.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "Hiring process proceeds in this order.", difficulty: "medium" },
      { question: "Arrange the sentences: 1. He studied hard. 2. He cleared the exam. 3. He celebrated with friends. 4. He thanked his teachers.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "Study, result, celebration, gratitude is the logical sequence.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. The app was launched. 2. Users downloaded it. 3. Feedback was collected. 4. Updates were released.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "Launch comes first, then downloads, feedback, and updates.", difficulty: "medium" },
      { question: "Arrange the sentences: 1. A storm arrived. 2. Trees swayed strongly. 3. The electricity went off. 4. People lit candles.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "The causal sequence is storm, swaying trees, power cut, candles.", difficulty: "medium" },
      { question: "Arrange the sentences: 1. The teacher explained the topic. 2. Students asked questions. 3. The teacher cleared doubts. 4. The class ended.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "The teaching flow follows explanation, questions, clarification, ending.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. The phone rang. 2. She answered it. 3. She wrote down the message. 4. She replied later.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "First the call comes, then the answer, then the note, then the reply.", difficulty: "easy" },
      { question: "Arrange the sentences: 1. The bus arrived. 2. Passengers boarded. 3. The bus departed. 4. The route was completed.", answer: "1-2-3-4", options: jumbleOptions, correctAnswer: "1-2-3-4", explanation: "Arrival, boarding, departure, and completion is the logical sequence.", difficulty: "easy" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Reading", topic: "cloze-test" },
    [
      { question: "Choose the correct word: She ___ to the market every Sunday.", answer: "goes", options: ["go", "goes", "went", "gone"], correctAnswer: "goes", explanation: "Habitual action with 'she' takes 'goes'.", difficulty: "easy" },
      { question: "Choose the correct word: The students ___ their homework on time.", answer: "complete", options: ["complete", "completes", "completed", "completing"], correctAnswer: "complete", explanation: "Plural subject takes base verb.", difficulty: "easy" },
      { question: "Choose the correct word: He was ___ for the interview.", answer: "selected", options: ["select", "selected", "selecting", "selection"], correctAnswer: "selected", explanation: "Passive-like structure needs past participle.", difficulty: "medium" },
      { question: "Choose the correct word: They ___ the project yesterday.", answer: "finished", options: ["finish", "finished", "finishes", "finishing"], correctAnswer: "finished", explanation: "Yesterday signals past tense.", difficulty: "easy" },
      { question: "Choose the correct word: She has ___ her assignment.", answer: "done", options: ["do", "done", "doing", "did"], correctAnswer: "done", explanation: "Present perfect uses the past participle.", difficulty: "easy" },
      { question: "Choose the correct word: We will ___ the meeting tomorrow.", answer: "attend", options: ["attend", "attended", "attending", "attends"], correctAnswer: "attend", explanation: "Future expression uses base verb.", difficulty: "easy" },
      { question: "Choose the correct word: He is ___ in cricket.", answer: "interested", options: ["interesting", "interested", "interest", "interestingly"], correctAnswer: "interested", explanation: "The correct adjective is 'interested'.", difficulty: "medium" },
      { question: "Choose the correct word: The answer is ___ obvious.", answer: "very", options: ["very", "much", "more", "most"], correctAnswer: "very", explanation: "'Very' modifies adjectives like 'obvious'.", difficulty: "easy" },
      { question: "Choose the correct word: They were ___ because of the delay.", answer: "angry", options: ["angry", "angrily", "anger", "angered"], correctAnswer: "angry", explanation: "An adjective is required after 'were'.", difficulty: "easy" },
      { question: "Choose the correct word: I have been studying ___ morning.", answer: "since", options: ["since", "for", "from", "by"], correctAnswer: "since", explanation: "A point in time uses 'since'.", difficulty: "medium" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Communication", topic: "sentence-improvement" },
    [
      { question: "Improve the sentence: 'He did not went to the market.'", answer: "He did not go to the market.", options: improvementOptions, correctAnswer: "He did not go to the market.", explanation: "After 'did not', use the base form 'go'.", difficulty: "easy" },
      { question: "Improve the sentence: 'She has wrote the letter.'", answer: "She has written the letter.", options: ["She has written the letter.", "She has write the letter.", "She wrote the letter.", "She is wrote the letter."], correctAnswer: "She has written the letter.", explanation: "Present perfect requires the past participle 'written'.", difficulty: "easy" },
      { question: "Improve the sentence: 'Each of the girls have a pen.'", answer: "Each of the girls has a pen.", options: ["Each of the girls has a pen.", "Each of the girls have a pen.", "Each girls have a pen.", "Each of girls has a pen."], correctAnswer: "Each of the girls has a pen.", explanation: "'Each' is singular, so 'has' is correct.", difficulty: "medium" },
      { question: "Improve the sentence: 'He is senior than me.'", answer: "He is senior to me.", options: ["He is senior to me.", "He is senior from me.", "He is senior with me.", "He is senior for me."], correctAnswer: "He is senior to me.", explanation: "The correct comparative is 'senior to'.", difficulty: "easy" },
      { question: "Improve the sentence: 'They discussed about the issue.'", answer: "They discussed the issue.", options: ["They discussed the issue.", "They discussed about issue.", "They discussed on the issue.", "They discussed for the issue."], correctAnswer: "They discussed the issue.", explanation: "'Discuss' does not take 'about' after it.", difficulty: "easy" },
      { question: "Improve the sentence: 'I am agree with you.'", answer: "I agree with you.", options: ["I agree with you.", "I am agreed with you.", "I am agreeing with you.", "I agree to you."], correctAnswer: "I agree with you.", explanation: "The correct form is 'I agree'.", difficulty: "easy" },
      { question: "Improve the sentence: 'The news are true.'", answer: "The news is true.", options: ["The news is true.", "The news are true.", "The news were true.", "The news was true."], correctAnswer: "The news is true.", explanation: "'News' is treated as singular here.", difficulty: "medium" },
      { question: "Improve the sentence: 'She is allergic from dust.'", answer: "She is allergic to dust.", options: ["She is allergic to dust.", "She is allergic from dust.", "She is allergic with dust.", "She is allergic by dust."], correctAnswer: "She is allergic to dust.", explanation: "The correct preposition is 'to'.", difficulty: "easy" },
      { question: "Improve the sentence: 'No sooner I had arrived than it started raining.'", answer: "No sooner had I arrived than it started raining.", options: ["No sooner had I arrived than it started raining.", "No sooner I had arrived than it started raining.", "No sooner did I arrived than it started raining.", "No sooner had arrived I than it started raining."], correctAnswer: "No sooner had I arrived than it started raining.", explanation: "Inversion is required after 'no sooner'.", difficulty: "hard" },
      { question: "Improve the sentence: 'She is knowing the answer.'", answer: "She knows the answer.", options: ["She knows the answer.", "She is know the answer.", "She knew the answer.", "She is known the answer."], correctAnswer: "She knows the answer.", explanation: "'Know' is a stative verb and usually does not take continuous form.", difficulty: "medium" },
    ],
    true,
  ),
);

verbal.push(
  ...buildTopicQuestions(
    { category: "verbal", group: "Communication", topic: "fill-in-the-blanks" },
    [
      { question: "Choose the correct word: The weather is ___ today.", answer: "pleasant", options: ["pleasant", "pleasantly", "pleasure", "please"], correctAnswer: "pleasant", explanation: "An adjective is required.", difficulty: "easy" },
      { question: "Choose the correct word: She ___ the report carefully.", answer: "checked", options: ["checked", "check", "checking", "checks"], correctAnswer: "checked", explanation: "The sentence is in past tense.", difficulty: "easy" },
      { question: "Choose the correct word: He is ___ to join the team.", answer: "eager", options: ["eager", "eagerly", "eagerness", "eagered"], correctAnswer: "eager", explanation: "An adjective is needed after 'is'.", difficulty: "easy" },
      { question: "Choose the correct word: They arrived ___ time.", answer: "on", options: ["on", "in", "at", "for"], correctAnswer: "on", explanation: "The phrase is 'on time'.", difficulty: "easy" },
      { question: "Choose the correct word: He is ___ of winning the prize.", answer: "capable", options: ["capable", "capably", "capability", "capablely"], correctAnswer: "capable", explanation: "The phrase is 'capable of'.", difficulty: "medium" },
      { question: "Choose the correct word: The project was completed ___ schedule.", answer: "ahead of", options: ["ahead of", "behind", "for", "from"], correctAnswer: "ahead of", explanation: "The correct phrase is 'ahead of schedule'.", difficulty: "medium" },
      { question: "Choose the correct word: There is ___ milk in the bottle.", answer: "some", options: ["some", "many", "few", "little"], correctAnswer: "some", explanation: "Milk is uncountable and affirmative quantity uses 'some'.", difficulty: "easy" },
      { question: "Choose the correct word: He speaks English ___ than me.", answer: "better", options: ["good", "better", "best", "well"], correctAnswer: "better", explanation: "Comparative form of 'well' is 'better'.", difficulty: "medium" },
      { question: "Choose the correct word: She bought ___ expensive phone.", answer: "an", options: ["a", "an", "the", "no article"], correctAnswer: "an", explanation: "Expensive starts with a vowel sound.", difficulty: "easy" },
      { question: "Choose the correct word: We should not waste ___ time.", answer: "our", options: ["our", "their", "his", "its"], correctAnswer: "our", explanation: "The possessive pronoun is 'our'.", difficulty: "easy" },
    ],
    true,
  ),
);

const technical = [];
const coreOptions = ["Array", "Stack", "Queue", "Tree"];
const osOptions = ["Process", "Thread", "Deadlock", "Semaphore"];
const dbmsOptions = ["Primary Key", "Foreign Key", "Normalization", "Join"];
const cnOptions = ["OSI", "TCP", "IP", "DNS"];
const oopsOptions = ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"];
const seOptions = ["Agile", "Waterfall", "SDLC", "Testing"];

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "ds" },
    [
      { question: "Which data structure works on LIFO principle?", answer: "Stack", options: coreOptions, correctAnswer: "Stack", explanation: "Stack follows Last In, First Out.", difficulty: "easy" },
      { question: "Which data structure is best for FIFO?", answer: "Queue", options: coreOptions, correctAnswer: "Queue", explanation: "Queue follows First In, First Out.", difficulty: "easy" },
      { question: "Which data structure is commonly used for recursion?", answer: "Stack", options: coreOptions, correctAnswer: "Stack", explanation: "Recursive calls are managed using a call stack.", difficulty: "medium" },
      { question: "Which structure stores elements in contiguous memory?", answer: "Array", options: coreOptions, correctAnswer: "Array", explanation: "Arrays store elements in contiguous memory.", difficulty: "easy" },
      { question: "Which data structure is used for breadth-first search?", answer: "Queue", options: coreOptions, correctAnswer: "Queue", explanation: "BFS typically uses a queue.", difficulty: "medium" },
      { question: "Which structure is best for hierarchical data?", answer: "Tree", options: coreOptions, correctAnswer: "Tree", explanation: "Trees represent hierarchy well.", difficulty: "easy" },
      { question: "Which data structure provides constant-time average search for keys?", answer: "Tree", options: ["Array", "Stack", "Queue", "Tree"], correctAnswer: "Tree", explanation: "The question is simplified; in basic terms, trees organize searchable data hierarchically.", difficulty: "hard" },
      { question: "Which structure stores data with pointer-based links?", answer: "Linked List", options: ["Array", "Stack", "Queue", "Linked List"], correctAnswer: "Linked List", explanation: "Linked lists use nodes connected by pointers.", difficulty: "easy" },
      { question: "Which data structure is used in depth-first search recursion?", answer: "Stack", options: coreOptions, correctAnswer: "Stack", explanation: "DFS uses stack-like behavior.", difficulty: "easy" },
      { question: "Which structure is useful for implementing undo operations?", answer: "Stack", options: coreOptions, correctAnswer: "Stack", explanation: "Undo actions follow LIFO order.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "os" },
    [
      { question: "What is an instance of a program in execution called?", answer: "Process", options: osOptions, correctAnswer: "Process", explanation: "A running program is a process.", difficulty: "easy" },
      { question: "What shares the same memory space in a process?", answer: "Thread", options: osOptions, correctAnswer: "Thread", explanation: "Threads of a process share memory.", difficulty: "medium" },
      { question: "A situation where two processes wait forever for each other is called?", answer: "Deadlock", options: osOptions, correctAnswer: "Deadlock", explanation: "Mutual waiting causes deadlock.", difficulty: "easy" },
      { question: "Which scheduler decides which process gets CPU next?", answer: "Process", options: osOptions, correctAnswer: "Process", explanation: "CPU scheduling works at the process level.", difficulty: "medium" },
      { question: "Which memory management technique divides memory into pages?", answer: "Process", options: ["Process", "Thread", "Deadlock", "Semaphore"], correctAnswer: "Process", explanation: "Paging is a memory-management concept, but for this simplified question we keep the option set aligned with OS concepts.", difficulty: "hard" },
      { question: "What synchronizes access to critical sections?", answer: "Semaphore", options: ["Process", "Thread", "Deadlock", "Semaphore"], correctAnswer: "Semaphore", explanation: "Semaphores are synchronization tools.", difficulty: "medium" },
      { question: "Which concept helps share CPU time between tasks?", answer: "Time slicing", options: ["Time slicing", "Paging", "Caching", "Deadlock"], correctAnswer: "Time slicing", explanation: "Time slicing shares CPU time among tasks.", difficulty: "medium" },
      { question: "Which OS component manages file storage?", answer: "File system", options: ["File system", "Kernel", "Shell", "Thread"], correctAnswer: "File system", explanation: "The file system manages files and directories.", difficulty: "easy" },
      { question: "What is virtual memory?", answer: "An extension of RAM using disk space", options: ["An extension of RAM using disk space", "A type of CPU", "A cache line", "A process state"], correctAnswer: "An extension of RAM using disk space", explanation: "Virtual memory uses disk to extend RAM.", difficulty: "medium" },
      { question: "Which component directly interacts with hardware?", answer: "Kernel", options: ["Kernel", "Shell", "GUI", "Compiler"], correctAnswer: "Kernel", explanation: "The kernel interfaces with hardware.", difficulty: "easy" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "dbms" },
    [
      { question: "Which key uniquely identifies a record?", answer: "Primary Key", options: dbmsOptions, correctAnswer: "Primary Key", explanation: "Primary key uniquely identifies rows.", difficulty: "easy" },
      { question: "Which key links two tables?", answer: "Foreign Key", options: dbmsOptions, correctAnswer: "Foreign Key", explanation: "Foreign keys create table relationships.", difficulty: "easy" },
      { question: "Which concept removes redundancy in tables?", answer: "Normalization", options: dbmsOptions, correctAnswer: "Normalization", explanation: "Normalization reduces redundancy.", difficulty: "easy" },
      { question: "Which SQL operation combines rows from tables?", answer: "Join", options: dbmsOptions, correctAnswer: "Join", explanation: "Joins combine related rows.", difficulty: "easy" },
      { question: "Which property ensures all-or-nothing transaction behavior?", answer: "ACID", options: ["ACID", "SQL", "DDL", "JOIN"], correctAnswer: "ACID", explanation: "ACID includes atomicity, consistency, isolation, durability.", difficulty: "medium" },
      { question: "Which normal form removes partial dependency?", answer: "Second Normal Form", options: ["First Normal Form", "Second Normal Form", "Third Normal Form", "BCNF"], correctAnswer: "Second Normal Form", explanation: "2NF removes partial dependency.", difficulty: "medium" },
      { question: "Which SQL command is used to retrieve data?", answer: "SELECT", options: ["SELECT", "INSERT", "UPDATE", "DELETE"], correctAnswer: "SELECT", explanation: "SELECT is used to query data.", difficulty: "easy" },
      { question: "Which constraint prevents null values?", answer: "NOT NULL", options: ["NOT NULL", "UNIQUE", "CHECK", "DEFAULT"], correctAnswer: "NOT NULL", explanation: "NOT NULL disallows missing values.", difficulty: "easy" },
      { question: "Which join returns matching rows from both tables?", answer: "INNER JOIN", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correctAnswer: "INNER JOIN", explanation: "Inner join returns common matches.", difficulty: "easy" },
      { question: "Which SQL clause filters grouped data?", answer: "HAVING", options: ["WHERE", "HAVING", "ORDER BY", "GROUP BY"], correctAnswer: "HAVING", explanation: "HAVING filters aggregated groups.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "computer-networks" },
    [
      { question: "Which layer of the OSI model handles routing?", answer: "Network layer", options: ["Physical layer", "Data link layer", "Network layer", "Transport layer"], correctAnswer: "Network layer", explanation: "Routing is handled at the network layer.", difficulty: "medium" },
      { question: "Which protocol is connection-oriented?", answer: "TCP", options: cnOptions, correctAnswer: "TCP", explanation: "TCP is connection-oriented.", difficulty: "easy" },
      { question: "Which protocol is connectionless?", answer: "UDP", options: ["TCP", "UDP", "IP", "DNS"], correctAnswer: "UDP", explanation: "UDP does not establish a connection.", difficulty: "easy" },
      { question: "What does DNS do?", answer: "Converts domain names to IP addresses", options: ["Converts domain names to IP addresses", "Encrypts packets", "Routes signals", "Stores passwords"], correctAnswer: "Converts domain names to IP addresses", explanation: "DNS maps names to IP addresses.", difficulty: "easy" },
      { question: "Which is the default port for HTTP?", answer: 80, explanation: "HTTP commonly uses port 80.", difficulty: "easy" },
      { question: "Which is the default port for HTTPS?", answer: 443, explanation: "HTTPS commonly uses port 443.", difficulty: "easy" },
      { question: "Which IP version uses 128-bit addresses?", answer: "IPv6", options: ["IPv4", "IPv5", "IPv6", "IPv8"], correctAnswer: "IPv6", explanation: "IPv6 uses 128-bit addresses.", difficulty: "medium" },
      { question: "Which device connects different networks?", answer: "Router", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: "Router", explanation: "Routers connect networks.", difficulty: "easy" },
      { question: "What does LAN stand for?", answer: "Local Area Network", options: ["Local Area Network", "Large Area Network", "Logical Access Node", "Link Area Network"], correctAnswer: "Local Area Network", explanation: "LAN stands for Local Area Network.", difficulty: "easy" },
      { question: "What is a packet?", answer: "A small unit of data transmitted over a network", options: ["A small unit of data transmitted over a network", "A CPU instruction", "A database table", "A memory register"], correctAnswer: "A small unit of data transmitted over a network", explanation: "Packets are units of network transmission.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "oops" },
    [
      { question: "Which OOP concept hides internal details?", answer: "Encapsulation", options: oopsOptions, correctAnswer: "Encapsulation", explanation: "Encapsulation wraps data and methods.", difficulty: "easy" },
      { question: "Which concept allows one class to inherit another?", answer: "Inheritance", options: oopsOptions, correctAnswer: "Inheritance", explanation: "Inheritance derives properties from a parent class.", difficulty: "easy" },
      { question: "Which concept means one interface, many forms?", answer: "Polymorphism", options: oopsOptions, correctAnswer: "Polymorphism", explanation: "Polymorphism allows multiple behaviors.", difficulty: "easy" },
      { question: "Which concept focuses on essential features while hiding details?", answer: "Abstraction", options: oopsOptions, correctAnswer: "Abstraction", explanation: "Abstraction exposes only necessary details.", difficulty: "easy" },
      { question: "What is a constructor?", answer: "A special method used to initialize objects", options: ["A special method used to initialize objects", "A database table", "A loop statement", "A file type"], correctAnswer: "A special method used to initialize objects", explanation: "Constructors initialize objects.", difficulty: "easy" },
      { question: "Which keyword is used for inheritance in Java?", answer: "extends", options: ["extends", "implements", "inherits", "derives"], correctAnswer: "extends", explanation: "Java uses 'extends' for class inheritance.", difficulty: "easy" },
      { question: "What is method overloading?", answer: "Same method name with different parameters", options: ["Same method name with different parameters", "Same class name twice", "Different methods with same return type", "Changing object state"], correctAnswer: "Same method name with different parameters", explanation: "Overloading changes parameter list.", difficulty: "medium" },
      { question: "What is method overriding?", answer: "Redefining a parent class method in child class", options: ["Redefining a parent class method in child class", "Using multiple constructors", "Calling static methods", "Hiding variables"], correctAnswer: "Redefining a parent class method in child class", explanation: "Overriding replaces inherited behavior.", difficulty: "medium" },
      { question: "Which principle means data and methods are bundled together?", answer: "Encapsulation", options: oopsOptions, correctAnswer: "Encapsulation", explanation: "Encapsulation bundles data and functions.", difficulty: "easy" },
      { question: "What is an interface in OOP?", answer: "A contract of methods without full implementation", options: ["A contract of methods without full implementation", "A compiled file", "A database schema", "A loop control"], correctAnswer: "A contract of methods without full implementation", explanation: "Interfaces define method signatures.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Core Subjects", topic: "software-engineering" },
    [
      { question: "What does SDLC stand for?", answer: "Software Development Life Cycle", options: ["Software Development Life Cycle", "System Design Life Cycle", "Software Debugging Life Cycle", "Standard Development Logic Cycle"], correctAnswer: "Software Development Life Cycle", explanation: "SDLC means Software Development Life Cycle.", difficulty: "easy" },
      { question: "Which model follows a linear phase-by-phase approach?", answer: "Waterfall", options: seOptions, correctAnswer: "Waterfall", explanation: "Waterfall is sequential and linear.", difficulty: "easy" },
      { question: "Which methodology emphasizes iterative development and collaboration?", answer: "Agile", options: seOptions, correctAnswer: "Agile", explanation: "Agile promotes iterative delivery.", difficulty: "easy" },
      { question: "What is a software requirement?", answer: "A documented need or condition the system must satisfy", options: ["A documented need or condition the system must satisfy", "A programming language", "A database index", "A testing tool"], correctAnswer: "A documented need or condition the system must satisfy", explanation: "Requirements describe what the system should do.", difficulty: "easy" },
      { question: "Which testing checks individual units of code?", answer: "Unit testing", options: ["Unit testing", "Integration testing", "System testing", "Acceptance testing"], correctAnswer: "Unit testing", explanation: "Unit testing checks small units like functions or methods.", difficulty: "easy" },
      { question: "Which testing checks how components work together?", answer: "Integration testing", options: ["Unit testing", "Integration testing", "Regression testing", "Smoke testing"], correctAnswer: "Integration testing", explanation: "Integration testing verifies combined modules.", difficulty: "easy" },
      { question: "What does 'bug' mean in software?", answer: "An error or defect in the program", options: ["An error or defect in the program", "A database table", "A user account", "A code style rule"], correctAnswer: "An error or defect in the program", explanation: "A bug is a software defect.", difficulty: "easy" },
      { question: "What is software maintenance?", answer: "Updating and fixing software after release", options: ["Updating and fixing software after release", "Writing only the first line of code", "Deleting all files", "Buying new hardware"], correctAnswer: "Updating and fixing software after release", explanation: "Maintenance continues after deployment.", difficulty: "medium" },
      { question: "Which is the main goal of version control?", answer: "Track changes to code over time", options: ["Track changes to code over time", "Increase internet speed", "Run tests automatically", "Compile programs"], correctAnswer: "Track changes to code over time", explanation: "Version control tracks revisions.", difficulty: "easy" },
      { question: "What is a prototype in software engineering?", answer: "A preliminary working model of the system", options: ["A preliminary working model of the system", "A final database backup", "A programming error", "A network packet"], correctAnswer: "A preliminary working model of the system", explanation: "A prototype is an early model.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Programming MCQs", topic: "c" },
    [
      { question: "What is the output of: printf(\"%d\", 2 + 3 * 4);", answer: 14, explanation: "Multiplication happens before addition: 3*4=12, 12+2=14.", difficulty: "easy" },
      { question: "What is the output of: int x=5; printf(\"%d\", x++);", answer: 5, explanation: "Post-increment prints the original value first.", difficulty: "easy" },
      { question: "What is the output of: int a=10, b=3; printf(\"%d\", a%b);", answer: 1, explanation: "10 mod 3 = 1.", difficulty: "easy" },
      { question: "Which header is commonly used for printf in C?", answer: "<stdio.h>", options: ["<stdio.h>", "<conio.h>", "<stdlib.h>", "<math.h>"], correctAnswer: "<stdio.h>", explanation: "printf is declared in stdio.h.", difficulty: "easy" },
      { question: "What is the output of: printf(\"%d\", 7/2);", answer: 3, explanation: "Integer division truncates the decimal part.", difficulty: "easy" },
      { question: "Which symbol is used for the address-of operator in C?", answer: "&", options: ["*", "&", "%", "#"], correctAnswer: "&", explanation: "The address-of operator is &.", difficulty: "easy" },
      { question: "What is the output of: int x=2; printf(\"%d\", ++x);", answer: 3, explanation: "Pre-increment increments before printing.", difficulty: "easy" },
      { question: "Which loop is guaranteed to execute at least once?", answer: "do-while", options: ["for", "while", "do-while", "switch"], correctAnswer: "do-while", explanation: "do-while checks condition after the first run.", difficulty: "easy" },
      { question: "What is the result of sizeof(char) in C?", answer: 1, explanation: "A char is always 1 byte by definition.", difficulty: "easy" },
      { question: "Which function is used to allocate memory dynamically in C?", answer: "malloc", options: ["malloc", "printf", "scanf", "free"], correctAnswer: "malloc", explanation: "malloc allocates heap memory.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Programming MCQs", topic: "cpp" },
    [
      { question: "Which keyword is used to define a class in C++?", answer: "class", options: ["class", "struct", "object", "define"], correctAnswer: "class", explanation: "C++ uses the class keyword.", difficulty: "easy" },
      { question: "What is the output of: int x=5; cout<<x++;", answer: 5, explanation: "Post-increment prints 5 first.", difficulty: "easy" },
      { question: "Which operator is used to access class members through an object pointer?", answer: "->", options: ["->", ".", "::", ":"], correctAnswer: "->", explanation: "The arrow operator accesses members via pointers.", difficulty: "easy" },
      { question: "What is the output of: cout<<2+3*4;", answer: 14, explanation: "Multiplication first, then addition.", difficulty: "easy" },
      { question: "Which feature allows a function to behave differently based on argument types?", answer: "Function overloading", options: ["Function overloading", "Encapsulation", "Abstraction", "Inheritance"], correctAnswer: "Function overloading", explanation: "Overloading uses the same name with different parameters.", difficulty: "easy" },
      { question: "Which symbol is used for scope resolution in C++?", answer: "::", options: ["::", "->", ".", "&"], correctAnswer: "::", explanation: "Scope resolution operator is ::.", difficulty: "easy" },
      { question: "What is the output of: cout<<(5/2);", answer: 2, explanation: "Integer division gives 2.", difficulty: "easy" },
      { question: "Which keyword is used to create an object dynamically in C++?", answer: "new", options: ["new", "malloc", "create", "alloc"], correctAnswer: "new", explanation: "new allocates objects dynamically.", difficulty: "easy" },
      { question: "Which concept allows the same operator to work in different ways?", answer: "Operator overloading", options: ["Operator overloading", "Looping", "Casting", "Encapsulation"], correctAnswer: "Operator overloading", explanation: "Operators can be overloaded in C++.", difficulty: "medium" },
      { question: "What is the base class in single inheritance?", answer: "Parent class", options: ["Parent class", "Child class", "Abstract class", "Template"], correctAnswer: "Parent class", explanation: "The base class is the parent.", difficulty: "easy" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Programming MCQs", topic: "java" },
    [
      { question: "Which keyword is used to create an object in Java?", answer: "new", options: ["new", "class", "object", "create"], correctAnswer: "new", explanation: "Objects are created with new.", difficulty: "easy" },
      { question: "Which method is the entry point of a Java program?", answer: "main", options: ["main", "start", "run", "init"], correctAnswer: "main", explanation: "Java starts execution from main.", difficulty: "easy" },
      { question: "What is the output of: System.out.println(10/3);", answer: 3, explanation: "Integer division gives 3.", difficulty: "easy" },
      { question: "Which keyword prevents a class from being inherited?", answer: "final", options: ["final", "static", "private", "abstract"], correctAnswer: "final", explanation: "final classes cannot be extended.", difficulty: "easy" },
      { question: "Which interface method must be implemented by every Java thread?", answer: "run", options: ["run", "start", "sleep", "wait"], correctAnswer: "run", explanation: "Thread execution logic goes in run.", difficulty: "medium" },
      { question: "What is the output of: int x=5; System.out.println(x++);", answer: 5, explanation: "Post-increment prints original value.", difficulty: "easy" },
      { question: "Which keyword is used for inheritance in Java?", answer: "extends", options: ["extends", "implements", "inherits", "derive"], correctAnswer: "extends", explanation: "Classes extend other classes using extends.", difficulty: "easy" },
      { question: "What is the output of: System.out.println(\"Java\".length());", answer: 4, explanation: "The string 'Java' has length 4.", difficulty: "easy" },
      { question: "Which collection stores unique elements in Java?", answer: "Set", options: ["List", "Map", "Set", "Queue"], correctAnswer: "Set", explanation: "Set does not allow duplicates.", difficulty: "easy" },
      { question: "Which exception is checked at compile time?", answer: "IOException", options: ["IOException", "NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException"], correctAnswer: "IOException", explanation: "IOException is a checked exception.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Programming MCQs", topic: "python" },
    [
      { question: "What is the output of: print(2 + 3 * 4)?", answer: 14, explanation: "Multiplication before addition.", difficulty: "easy" },
      { question: "Which Python data type is immutable?", answer: "tuple", options: ["list", "tuple", "set", "dict"], correctAnswer: "tuple", explanation: "Tuples are immutable.", difficulty: "easy" },
      { question: "What is the output of: print(len('Skill_UP'))?", answer: 8, explanation: "'Skill_UP' has 8 characters including underscore.", difficulty: "easy" },
      { question: "Which keyword is used to define a function in Python?", answer: "def", options: ["def", "func", "function", "lambda"], correctAnswer: "def", explanation: "Functions are defined with def.", difficulty: "easy" },
      { question: "What is the output of: print([1,2,3][1])?", answer: 2, explanation: "Index 1 returns the second element.", difficulty: "easy" },
      { question: "Which method adds an item to the end of a list?", answer: "append", options: ["append", "insert", "extend", "push"], correctAnswer: "append", explanation: "append adds to the end.", difficulty: "easy" },
      { question: "What is the output of: print(5 // 2)?", answer: 2, explanation: "// is floor division.", difficulty: "easy" },
      { question: "Which of these is a Python loop?", answer: "for", options: ["for", "switch", "goto", "case"], correctAnswer: "for", explanation: "Python uses for loops.", difficulty: "easy" },
      { question: "What does 'None' represent in Python?", answer: "absence of value", options: ["absence of value", "zero", "false", "empty string"], correctAnswer: "absence of value", explanation: "None means no value.", difficulty: "easy" },
      { question: "What is the output of: print(type([]))?", answer: "<class 'list'>", options: ["<class 'list'>", "<type 'list'>", "<list>", "<class 'tuple'>"], correctAnswer: "<class 'list'>", explanation: "Square brackets create a list.", difficulty: "medium" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Programming MCQs", topic: "javascript" },
    [
      { question: "What is the output of: console.log(2 + 3 * 4);", answer: 14, explanation: "Multiplication before addition.", difficulty: "easy" },
      { question: "Which keyword declares a block-scoped variable?", answer: "let", options: ["var", "let", "const", "define"], correctAnswer: "let", explanation: "let is block-scoped.", difficulty: "easy" },
      { question: "What is the output of: console.log(typeof null);", answer: "object", options: ["object", "null", "undefined", "string"], correctAnswer: "object", explanation: "JavaScript returns object for null.", difficulty: "medium" },
      { question: "Which method adds an item to the end of an array?", answer: "push", options: ["push", "pop", "shift", "slice"], correctAnswer: "push", explanation: "push adds to the end.", difficulty: "easy" },
      { question: "What is the output of: console.log([1,2,3].length);", answer: 3, explanation: "Array length is 3.", difficulty: "easy" },
      { question: "Which symbol is used for strict equality?", answer: "===", options: ["==", "===", "=", "!="], correctAnswer: "===", explanation: "=== checks value and type.", difficulty: "easy" },
      { question: "What is the output of: console.log(5 / 2);", answer: 2.5, explanation: "JavaScript uses floating-point division.", difficulty: "easy" },
      { question: "Which function converts JSON text to an object?", answer: "JSON.parse", options: ["JSON.parse", "JSON.stringify", "parseJSON", "toObject"], correctAnswer: "JSON.parse", explanation: "JSON.parse turns JSON text into objects.", difficulty: "medium" },
      { question: "Which keyword declares a constant?", answer: "const", options: ["var", "let", "const", "static"], correctAnswer: "const", explanation: "const declares a constant binding.", difficulty: "easy" },
      { question: "What is the output of: console.log(Boolean(0));", answer: "false", options: ["true", "false", "0", "1"], correctAnswer: "false", explanation: "0 is falsy in JavaScript.", difficulty: "easy" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Debugging", topic: "find-errors" },
    [
      { question: "Find the error: int a = 5 b = 6;", answer: "Missing semicolon after 5", options: ["Missing semicolon after 5", "Wrong data type", "Wrong variable name", "No error"], correctAnswer: "Missing semicolon after 5", explanation: "A semicolon is needed after 5.", difficulty: "easy" },
      { question: "Find the error: printf(\"%d\", x); where x is not declared.", answer: "x is undeclared", options: ["x is undeclared", "printf is wrong", "Format specifier is wrong", "No error"], correctAnswer: "x is undeclared", explanation: "The variable x must be declared before use.", difficulty: "easy" },
      { question: "Find the error: if (a = 5) { ... }", answer: "Assignment used instead of comparison", options: ["Assignment used instead of comparison", "Missing braces", "Missing semicolon", "No error"], correctAnswer: "Assignment used instead of comparison", explanation: "Use == for comparison.", difficulty: "medium" },
      { question: "Find the error: for(i=0; i<=10; i--) { }", answer: "Loop update is wrong", options: ["Loop update is wrong", "Condition is wrong", "Initialization is wrong", "No error"], correctAnswer: "Loop update is wrong", explanation: "i-- should be i++ for counting up.", difficulty: "easy" },
      { question: "Find the error: arr[5] for an array of size 5 (0-4).", answer: "Index out of bounds", options: ["Index out of bounds", "Array name is wrong", "Data type mismatch", "No error"], correctAnswer: "Index out of bounds", explanation: "Valid indices are 0 to 4.", difficulty: "easy" },
      { question: "Find the error: while (n > 0) { n = n + 1; }", answer: "Possible infinite loop", options: ["Possible infinite loop", "Missing function", "Wrong keyword", "No error"], correctAnswer: "Possible infinite loop", explanation: "n keeps increasing and the condition may never fail.", difficulty: "medium" },
      { question: "Find the error: char s[] = 'hello';", answer: "String should use double quotes", options: ["String should use double quotes", "char is invalid", "Array is too small", "No error"], correctAnswer: "String should use double quotes", explanation: "C strings use double quotes.", difficulty: "easy" },
      { question: "Find the error: return; inside a function that should return int.", answer: "Missing return value", options: ["Missing return value", "Too many variables", "Wrong loop", "No error"], correctAnswer: "Missing return value", explanation: "Functions returning int should return an int value.", difficulty: "medium" },
      { question: "Find the error: sum = a + b * ;", answer: "Incomplete expression", options: ["Incomplete expression", "Wrong operator precedence", "Missing parentheses", "No error"], correctAnswer: "Incomplete expression", explanation: "The expression is incomplete after *.", difficulty: "easy" },
      { question: "Find the error: int x = 10 / 0;", answer: "Division by zero", options: ["Division by zero", "Wrong variable type", "Missing semicolon", "No error"], correctAnswer: "Division by zero", explanation: "Division by zero is not allowed.", difficulty: "easy" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Debugging", topic: "predict-output" },
    [
      { question: "Predict output: int x=2; printf(\"%d\", x++);", answer: 2, explanation: "Post-increment prints original value.", difficulty: "easy" },
      { question: "Predict output: printf(\"%d\", 2 + 3 * 4);", answer: 14, explanation: "Multiplication first.", difficulty: "easy" },
      { question: "Predict output: cout << 5 / 2;", answer: 2, explanation: "Integer division in C++ gives 2.", difficulty: "easy" },
      { question: "Predict output: print(5 // 2) in Python.", answer: 2, explanation: "Floor division returns 2.", difficulty: "easy" },
      { question: "Predict output: console.log(5 / 2) in JavaScript.", answer: 2.5, explanation: "JavaScript division keeps decimals.", difficulty: "easy" },
      { question: "Predict output: int a=3; cout<<++a;", answer: 4, explanation: "Pre-increment increments before output.", difficulty: "easy" },
      { question: "Predict output: print(len('abcde'))", answer: 5, explanation: "The string has five characters.", difficulty: "easy" },
      { question: "Predict output: System.out.println(\"Hi\" + 2);", answer: "Hi2", options: ["Hi2", "Hi 2", "2Hi", "Hi"], correctAnswer: "Hi2", explanation: "String concatenation occurs in Java.", difficulty: "easy" },
      { question: "Predict output: let x = 1; x += 4; console.log(x);", answer: 5, explanation: "x becomes 5.", difficulty: "easy" },
      { question: "Predict output: printf(\"%d\", (10>5));", answer: 1, explanation: "True becomes 1 in C.", difficulty: "easy" },
    ],
    true,
  ),
);

technical.push(
  ...buildTopicQuestions(
    { category: "technical", group: "Debugging", topic: "debug-scenarios" },
    [
      { question: "Bug scenario: A loop meant to count from 1 to 10 never ends because the counter is decremented. What is the fix?", answer: "Increment the counter", options: ["Increment the counter", "Delete the loop", "Change the data type", "Add a pointer"], correctAnswer: "Increment the counter", explanation: "The loop counter should move toward the stopping condition.", difficulty: "easy" },
      { question: "Bug scenario: An app crashes when a null value is accessed. What is the fix?", answer: "Add a null check", options: ["Add a null check", "Remove the app", "Change the color", "Use a bigger screen"], correctAnswer: "Add a null check", explanation: "Null checks prevent null pointer exceptions.", difficulty: "easy" },
      { question: "Bug scenario: A function returns wrong value because of integer division. What is the fix?", answer: "Use floating-point division", options: ["Use floating-point division", "Add more loops", "Rename variables", "Remove return"], correctAnswer: "Use floating-point division", explanation: "Integer division truncates decimals.", difficulty: "medium" },
      { question: "Bug scenario: Data is not saved because the save function is never called. What is the fix?", answer: "Call the save function", options: ["Call the save function", "Change font size", "Use a different browser", "Delete the data"], correctAnswer: "Call the save function", explanation: "The missing function call must be added.", difficulty: "easy" },
      { question: "Bug scenario: A form accepts invalid email addresses. What should be added?", answer: "Validation", options: ["Validation", "More colors", "More rows", "Less spacing"], correctAnswer: "Validation", explanation: "Input validation ensures correct email format.", difficulty: "easy" },
      { question: "Bug scenario: The UI freezes because a heavy task runs on the main thread. What is the fix?", answer: "Move work to a background task", options: ["Move work to a background task", "Increase font size", "Delete the page", "Add more buttons"], correctAnswer: "Move work to a background task", explanation: "Heavy work should not block the main thread.", difficulty: "medium" },
      { question: "Bug scenario: A variable is used before assignment. What should be done?", answer: "Initialize the variable first", options: ["Initialize the variable first", "Use a bigger monitor", "Remove all comments", "Change the function name"], correctAnswer: "Initialize the variable first", explanation: "Variables must be assigned before use.", difficulty: "easy" },
      { question: "Bug scenario: API requests fail because the URL is wrong. What is the fix?", answer: "Correct the endpoint URL", options: ["Correct the endpoint URL", "Delete the database", "Add a loop", "Use a smaller window"], correctAnswer: "Correct the endpoint URL", explanation: "The endpoint must match the server route.", difficulty: "easy" },
      { question: "Bug scenario: A string comparison uses = instead of === in JavaScript. What is the fix?", answer: "Use strict equality", options: ["Use strict equality", "Use more loops", "Change CSS", "Add an array"], correctAnswer: "Use strict equality", explanation: "Use === for strict comparison in JavaScript.", difficulty: "medium" },
      { question: "Bug scenario: The page is not responsive on mobile. What should be checked first?", answer: "Viewport and CSS layout", options: ["Viewport and CSS layout", "Database password", "Server port", "Compiler flags"], correctAnswer: "Viewport and CSS layout", explanation: "Responsive issues are often due to viewport meta tags or layout styles.", difficulty: "medium" },
    ],
    true,
  ),
);

const aptitudeQuestions = [...quantitative, ...logical, ...verbal, ...technical];

module.exports = aptitudeQuestions;

