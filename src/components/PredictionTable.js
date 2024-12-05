const PredictionTable = ({ predictions }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>|</th>
                    <th>Course Code   </th>
                    <th>| </th>
                    <th>Predicted Enrollment   </th>
                    <th>|</th>
                    <th>Predicted Sections   </th>                   
                </tr>
            </thead>
            <tbody>
                {predictions.map((pred, index) => (
                    <tr key={index}>
                        <th></th>
                        <td>{pred.courseCode}</td>
                        <th></th>
                        <td>{pred.predictedEnrollment}</td>
                        <th></th>
                        <td>{Math.ceil(pred.predictedEnrollment / pred.maxStudents)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PredictionTable;
