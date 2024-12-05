import * as tf from '@tensorflow/tfjs';

const TrainModelButton = ({ data, onModelTrained }) => {
    const handleTrainModel = () => {
        if (data.length === 0) {
            alert("No data provided!");
            alert("The data is empty");
            alert("Try entering some data first");
            return;
        }

        // Prepare the dataset
        const inputs = data.map((item) => item.totalStudents);
        const labels = data.map((item) => item.totalStudents / 30); // Example label: sections needed

        // Normalize inputs and labels
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        // Build the model
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        // Train the model
        model.fit(inputTensor, labelTensor, { epochs: 10 }).then(() => {
            onModelTrained(model);
            alert("Model trained successfully!");
        });
    };

    return <button onClick={handleTrainModel}>Train Model</button>;
};

export default TrainModelButton;
