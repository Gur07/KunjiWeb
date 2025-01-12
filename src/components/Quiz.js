// // import React, { useEffect } from 'react';

// // const prompt = "Create a quiz containing 10 Single choice questions with 4 options to assess the financial knowledge of a person in India. Make sure to add at least 2 questions regarding some current financial affairs to check the awareness of the person. Make sure to append the correct answer at the end of each question in the format : 'Correct Answer: Option Name'.";

// // const Quiz = () => {

// //   useEffect(() => {
// //     const loadScript = () => {
// //       return new Promise((resolve, reject) => {
// //         if (document.querySelector(`script[src="https://js.puter.com/v2/"]`)) {
// //           resolve(); // Script already loaded
// //           return;
// //         }

// //         const script = document.createElement('script');
// //         script.src = "https://js.puter.com/v2/";
// //         script.async = true;

// //         script.onload = resolve;
// //         script.onerror = () => reject(new Error('Failed to load Puter script.'));

// //         document.body.appendChild(script);
// //       });
// //     };

// //     const parseResponse = (response) => {
// //       let lines = response.split('\n');
// //       let quizJSON = {};
// //       let ques = "";
// //       let optionA = "";
// //       let optionB = "";
// //       let optionC = "";
// //       let optionD = "";
// //       let correctAnswer = "";

// //       for (let line of lines) {
// //         line = line.trim();
// //         // Check for question format
// //         if (/^\d+\./.test(line)) {
// //           ques = line;
// //         } 
// //         // Check for options (lowercase a-d)
// //         else if (line.startsWith('a)')||line.startsWith('b)')||line.startsWith('c)')||line.startsWith('d)') || line.startsWith('A)')||line.startsWith('B)')||line.startsWith('C)')||line.startsWith('D)')) {
// //           if (optionA === "") {
// //             optionA = line;
// //           } else if (optionB === "") {
// //             optionB = line;
// //           } else if (optionC === "") {
// //             optionC = line;
// //           } else if (optionD === "") {
// //             optionD = line;
// //           }
// //         } 
// //         // Check for correct answer
// //         else if (line.startsWith("Correct Answer:")) {
// //           correctAnswer = line.split(":")[1].trim();
// //           quizJSON[ques] = {
// //             "optionA": optionA,
// //             "optionB": optionB,
// //             "optionC": optionC,
// //             "optionD": optionD,
// //             "correctAnswer": correctAnswer
// //           };
// //           // Reset variables for the next question
// //           ques = "";
// //           optionA = "";
// //           optionB = "";
// //           optionC = "";
// //           optionD = "";
// //           correctAnswer = "";
// //         }
// //       }
// //       console.log('Parsed Quiz JSON:', quizJSON);
// //       return quizJSON;
// //     };

// //     const fetchQuiz = async () => {
// //       try {
// //         await loadScript();
// //         if (window.puter && !window.puterInitialized) {
// //           window.puterInitialized = true; // Prevent reinitialization
// //           let fullResponse = '';
// //           const resp = await window.puter.ai.chat(prompt, { stream: true });
// //           for await (const part of resp) {
// //             fullResponse += part.text;
// //             document.getElementById('puter-chat').innerHTML += part.text.replaceAll('\n', '<br>');
// //           }
// //           fullResponse = fullResponse.trim();
// //           fullResponse = fullResponse.replaceAll('#', ''); // Remove any hashtags
// //           fullResponse = fullResponse.replaceAll('*', ''); // Remove any asterisks
// //           console.log(fullResponse);
// //           parseResponse(fullResponse);
// //         } else if (!window.puter) {
// //           throw new Error('Puter library not available.');
// //         }
// //       } catch (error) {
// //         console.error('Error during script execution:', error);
// //       }
// //     };

// //     fetchQuiz();

// //     return () => {
// //       const script = document.querySelector(`script[src="https://js.puter.com/v2/"]`);
// //       if (script) document.body.removeChild(script);
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <div id="puter-chat"></div>
// //     </div>
// //   );
// // };

// // export default Quiz;

// import React, { useEffect, useState } from 'react';
// import '../styles/Auth.css';

// const Quiz = () => {
//   const [quizData, setQuizData] = useState({});
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     const loadScript = () => {
//       return new Promise((resolve, reject) => {
//         if (document.querySelector(`script[src="https://js.puter.com/v2/"]`)) {
//           resolve();
//           return;
//         }

//         const script = document.createElement('script');
//         script.src = "https://js.puter.com/v2/";
//         script.async = true;

//         script.onload = resolve;
//         script.onerror = () => reject(new Error('Failed to load Puter script.'));

//         document.body.appendChild(script);
//       });
//     };

//     const parseResponse = (response) => {
//       let lines = response.split('\n');
//       let quizJSON = {};
//       let ques = "";
//       let optionA = "";
//       let optionB = "";
//       let optionC = "";
//       let optionD = "";
//       let correctAnswer = "";

//       for (let line of lines) {
//         line = line.trim();
//         if (/^\d+\./.test(line)) {
//           ques = line;
//         } 
//         else if (line.startsWith('a)')||line.startsWith('b)')||line.startsWith('c)')||line.startsWith('d)') || 
//                 line.startsWith('A)')||line.startsWith('B)')||line.startsWith('C)')||line.startsWith('D)')) {
//           if (optionA === "") {
//             optionA = line;
//           } else if (optionB === "") {
//             optionB = line;
//           } else if (optionC === "") {
//             optionC = line;
//           } else if (optionD === "") {
//             optionD = line;
//           }
//         } 
//         else if (line.startsWith("Correct Answer:")) {
//           correctAnswer = line.split(":")[1].trim();
//           quizJSON[ques] = {
//             optionA,
//             optionB,
//             optionC,
//             optionD,
//             correctAnswer
//           };
//           ques = "";
//           optionA = "";
//           optionB = "";
//           optionC = "";
//           optionD = "";
//           correctAnswer = "";
//         }
//       }
//       return quizJSON;
//     };

//     const fetchQuiz = async () => {
//       try {
//         await loadScript();
//         if (window.puter && !window.puterInitialized) {
//           window.puterInitialized = true;
//           let fullResponse = '';
//           (async () => {
//             const resp = await window.puter.ai.chat(prompt, {stream: true });
//             for await ( const part of resp ) fullResponse+=part.text;
//         })();
//           fullResponse = fullResponse.trim()
//             .replaceAll('#', '')
//             .replaceAll('*', '');
//           const parsedQuiz = parseResponse(fullResponse);
//           setQuizData(parsedQuiz);
//         }
//       } catch (error) {
//         console.error('Error during script execution:', error);
//       }
//     };

//     fetchQuiz();

//     return () => {
//       const script = document.querySelector(`script[src="https://js.puter.com/v2/"]`);
//       if (script) document.body.removeChild(script);
//     };
//   }, []);

//   const handleAnswerSelect = (question, option) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [question]: option
//     }));
//   };

//   const handleSubmit = () => {
//     let correctCount = 0;
//     Object.entries(quizData).forEach(([question, data]) => {
//       if (userAnswers[question] === data.correctAnswer) {
//         correctCount++;
//       }
//     });
//     setScore(correctCount);
//     setSubmitted(true);
//   };

//   return (
//     <div className="quiz-container">
//       <h1>Financial Knowledge Quiz</h1>
      
//       {Object.entries(quizData).map(([question, data], index) => (
//         <div key={index} className="question-block">
//           <p className="question">{question}</p>
//           <div className="options">
//             {['optionA', 'optionB', 'optionC', 'optionD'].map((option) => (
//               <label key={option} className="option-label">
//                 <input
//                   type="radio"
//                   name={question}
//                   value={option}
//                   checked={userAnswers[question] === option}
//                   onChange={() => handleAnswerSelect(question, option)}
//                   disabled={submitted}
//                 />
//                 <span className={submitted && data.correctAnswer === option ? 'correct' : ''}>
//                   {data[option]}
//                 </span>
//               </label>
//             ))}
//           </div>
//           {submitted && userAnswers[question] && (
//             <div className="answer-feedback">
//               {userAnswers[question] === data.correctAnswer ? 
//                 <span className="correct-answer">Correct!</span> : 
//                 <span className="wrong-answer">Incorrect. The correct answer is: {data[data.correctAnswer]}</span>
//               }
//             </div>
//           )}
//         </div>
//       ))}

//       {Object.keys(quizData).length > 0 && !submitted && (
//         <button className="submit-button" onClick={handleSubmit}>
//           Submit Quiz
//         </button>
//       )}

//       {submitted && (
//         <div className="score-display">
//           <h2>Your Score: {score} out of {Object.keys(quizData).length}</h2>
//           <p>Percentage: {((score / Object.keys(quizData).length) * 100).toFixed(2)}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;


import React, { useState } from 'react';

const Quiz = () => {
  const quizQuestions = {
    "1. What is the current Repo Rate set by RBI as of 2024?": {
      optionA: "a) 6.25%",
      optionB: "b) 6.5%",
      optionC: "c) 7.0%",
      optionD: "d) 7.25%",
      correctAnswer: "Option B"
    },
    "2. Which Indian bank launched India's first PSU sovereign green bond ETF in 2023?": {
      optionA: "a) SBI",
      optionB: "b) PNB",
      optionC: "c) Bank of Baroda",
      optionD: "d) Canara Bank",
      correctAnswer: "Option A"
    },
    "3. What is the maximum deposit amount insured by DICGC per bank account?": {
      optionA: "a) Rs. 1 Lakh",
      optionB: "b) Rs. 3 Lakhs",
      optionC: "c) Rs. 5 Lakhs",
      optionD: "d) Rs. 10 Lakhs",
      correctAnswer: "Option C"
    },
    "4. What is the minimum investment required for opening a Demat account?": {
      optionA: "a) Rs. 5,000",
      optionB: "b) Rs. 10,000",
      optionC: "c) No minimum requirement",
      optionD: "d) Rs. 20,000",
      correctAnswer: "Option C"
    },
    "5. Which of these is NOT a type of mutual fund?": {
      optionA: "a) Equity Fund",
      optionB: "b) Debt Fund",
      optionC: "c) Fixed Deposit Fund",
      optionD: "d) Hybrid Fund",
      correctAnswer: "Option C"
    },
    "6. What is the current GST rate for gold jewelry in India?": {
      optionA: "a) 18%",
      optionB: "b) 12%",
      optionC: "c) 5%",
      optionD: "d) 3%",
      correctAnswer: "Option D"
    },
    "7. What is the maximum tax deduction limit under Section 80C?": {
      optionA: "a) Rs. 1 Lakh",
      optionB: "b) Rs. 1.5 Lakhs",
      optionC: "c) Rs. 2 Lakhs",
      optionD: "d) Rs. 2.5 Lakhs",
      correctAnswer: "Option B"
    },
    "8. Which organization regulates the insurance sector in India?": {
      optionA: "a) RBI",
      optionB: "b) SEBI",
      optionC: "c) IRDAI",
      optionD: "d) PFRDA",
      correctAnswer: "Option C"
    },
    "9. What is the minimum age requirement for opening a PPF account?": {
      optionA: "a) 16 years",
      optionB: "b) 18 years",
      optionC: "c) 21 years",
      optionD: "d) No age limit",
      correctAnswer: "Option D"
    },
    "10. Which of these is a mandatory requirement for filing Income Tax returns?": {
      optionA: "a) Aadhaar Card",
      optionB: "b) Voter ID",
      optionC: "c) Driving License",
      optionD: "d) Passport",
      correctAnswer: "Option A"
    }
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (question, option) => {
    setUserAnswers(prev => ({
      ...prev,
      [question]: `Option ${option}`
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    Object.entries(quizQuestions).forEach(([question, data]) => {
      if (userAnswers[question] === data.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  return (
    <div className="quiz-container">
      <h1>Financial Knowledge Quiz</h1>
      {Object.entries(quizQuestions).map(([question, data]) => (
        <div key={question} className="question-container">
          <p className="question">{question}</p>
          <div className="options-container">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="option-label">
                <input
                  type="radio"
                  name={question}
                  value={`Option ${option}`}
                  checked={userAnswers[question] === `Option ${option}`}
                  onChange={() => handleOptionSelect(question, option)}
                  disabled={isSubmitted}
                />
                <span className={`option-text ${
                  isSubmitted && `Option ${option}` === data.correctAnswer ? 'correct' : ''
                } ${
                  isSubmitted && userAnswers[question] === `Option ${option}` && 
                  `Option ${option}` !== data.correctAnswer ? 'incorrect' : ''
                }`}>
                  {data[`option${option}`]}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!isSubmitted && (
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={Object.keys(userAnswers).length !== Object.keys(quizQuestions).length}
        >
          Submit Quiz
        </button>
      )}
      {score !== null && (
        <div className="score-container">
          <h2>Your Score: {score} out of {Object.keys(quizQuestions).length}</h2>
          <p className="percentage">
            Percentage: {((score / Object.keys(quizQuestions).length) * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;