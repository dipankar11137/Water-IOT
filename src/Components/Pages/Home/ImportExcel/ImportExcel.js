import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import file from '../../../../Images/excel/SolarIOT.xlsx';

const ImportExcel = ({ ph, setPh, setBattery, setVoltage }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(file);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });

        // Assuming you have only one sheet, if there are multiple sheets, adjust accordingly
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // sum all ph value
        const phColumnIndex = 1;

        // Calculate the sum of pH values
        const phSum = jsonData.reduce((sum, row) => {
          // Extract pH values from each item in the row
          const phValues = row.map(item => {
            const matches = item.match(/pH: (\d+\.\d+)/);
            return matches ? parseFloat(matches[1]) : 0;
          });

          // Sum up the extracted pH values
          return (
            sum + phValues.reduce((subSum, phValue) => subSum + phValue, 0)
          );
        }, 0);
        setPh((phSum / jsonData.length).toFixed(2));
        // console.log(jsonData.length);
        // console.log(phColumnIndex);

        // Set the Excel data in the state

        // set last ph value
        const finalData = jsonData[jsonData.length - 1];
        const phElement = finalData.find(element => element.startsWith('pH:'));
        const phValue = phElement ? phElement.replace('pH: ', '').trim() : null;
        // end last ph value

        // set battery value
        const batElement = finalData.find(element => element.includes('Bat:'));

        // If a Bat element is found, extract the Bat value
        const batValue = batElement
          ? batElement.replace('Bat: ', '').trim()
          : null;
        setBattery(batValue);

        // set voltage value
        const voltageElement = finalData.find(element =>
          element.includes('S:')
        );

        // If a Bat element is found, extract the Bat value
        const voltageValue = voltageElement
          ? voltageElement.replace('S: ', '').trim()
          : null;
        setVoltage(voltageValue);
      } catch (error) {
        console.error('Error fetching or processing Excel file:', error);
      }
    };

    fetchData();
  }, [ph]);
  return <div>{/* <h1>Dado</h1> */}</div>;
};

export default ImportExcel;
