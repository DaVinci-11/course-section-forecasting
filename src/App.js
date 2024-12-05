import React, { useState } from 'react';
import InputForm from './components/InputForm';
import TrainModelButton from './components/TrainModelButton';
import PredictionTable from './components/PredictionTable';
import Visualization from './components/Visualization';
import './styles.css';

const App = () => {
   const [data, setData] = useState([]);
   const [model, setModel] = useState(null);
   const [predictions, setPredictions] = useState([]);

   const handleDataSubmit = (inputData, maxStudents) => {
       setData(inputData.map((item) => ({ ...item, maxStudents })));
   };

   const handleModelTrained = (trainedModel) => {
    setModel(trainedModel);
    setPredictions([]); // Reset predictions before updating
    const preds = data.map((item) => ({
      courseCode: item.courseCode,
      predictedEnrollment: Math.round(item.totalStudents * 1.1), // Dummy prediction logic
      maxStudents: item.maxStudents,
    }));
    setPredictions(preds);
  };
  

   return (
       <div className="container">
           <h1>Adesa - Course Section Forecasting System</h1>
           <InputForm onDataSubmit={handleDataSubmit} />
           <TrainModelButton data={data} onModelTrained={handleModelTrained} />
           {predictions.length > 0 && (
               <>
                   <PredictionTable predictions={predictions} />
                   <Visualization predictions={predictions} />
               </>
           )}
       </div>
   );
};

export default App;
