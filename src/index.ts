import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

function detectFace(fileName: string) {
    console.log(`Running logo detection on ${fileName}`);
    client.logoDetection(fileName)
    .then(([result]) => {
        let scores: number[] = [];
        const logos = result.logoAnnotations;
        logos?.forEach((logo) => {
            if (logo.description)
                console.log(`"${logo.description}" found in in file ${fileName}`);
            if (logo.score)
                scores.push(logo.score);
        });
        const avg = scores.reduce((a, b) => a + b) / scores.length;
        console.log(`Average score for ${fileName}: ${avg}`);
    })
    .catch((err) => {
        if (err.code === 'ENOENT')
            console.log(`File ${fileName} not found`);
    });
}

/**
 * Runs logo detection on the given list of file names and logs the description and average score of each logo.
 * @param fileNames - An array of file names to run logo detection on.
 * @returns void
 */
function main (fileNames: string[]): void {
    fileNames.forEach((fileName: string) => {
        console.log(`Running logo detection on ${fileName}`);
        client.logoDetection(fileName)
        .then(([result]) => {
            let scores: number[] = [];
            const logos = result.logoAnnotations;
            logos?.forEach((logo) => {
                if (logo.description)
                    console.log(`"${logo.description}" found in in file ${fileName}`);
                if (logo.score)
                    scores.push(logo.score);
            });
            const avg = scores.reduce((a, b) => a + b) / scores.length;
            console.log(`Average score for ${fileName}: ${avg}`);
        })
        .catch((err) => {
            if (err.code === 'ENOENT')
                console.log(`File ${fileName} not found`);
        });
    });
}

// Implement the async version of the above here
// Your version should not use .then and should use try/catch instead of .catch
// async function mainAsync(fileNames: string[]): Promise<void> {
//     // Your code here
// }

// Advantages:
// - The async version of the function is easier to read and understand.
// - The async version of the function is easier to debug and maintain.
// - The async version of the function is easier to test.
// - Error handling is more consistent and easier to understand in the async version of the function.
async function mainAsync(fileNames: string[]): Promise<void> {
    for (const fileName of fileNames) {
        try {
            console.log(`Running logo detection on ${fileName}`);
            const [result] = await client.logoDetection(fileName);
            let scores: number[] = [];
            const logos = result.logoAnnotations;
            logos?.forEach((logo) => {
                if (logo.description)
                    console.log(`"${logo.description}" found in file ${fileName}`);
                if (logo.score)
                    scores.push(logo.score);
            });
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            if(scores.length > 0) {
                console.log(`Average score for ${fileName}: ${avg}`);
            } else {
                console.log(`No logos detected in ${fileName}.`);
            }
        } catch (err: any) {
            if (err.code === 'ENOENT')
                console.log(`File ${fileName} not found`);
            else
                console.error(`Error processing file ${fileName}`, err);
        }
    }
}

main([
    './images/cmu.jpg', 
    './images/logo-types-collection.jpg', 
    './images/not-a-file.jpg'
]);

mainAsync([
    './images/cmu.jpg', 
    './images/logo-types-collection.jpg', 
    './images/not-a-file.jpg'
]);
