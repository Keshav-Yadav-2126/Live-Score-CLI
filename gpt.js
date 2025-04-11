import axios from "axios";
import { currentDay , currentMonth } from "./getDate.js";
import ora from "ora";
import chalk from "chalk";

export async function getLiveScore() {
    try {
        const token = "314af073-2291-4bf4-8075-462fa7973084"
        const response = await axios.get(`https://api.cricapi.com/v1/cricScore?apikey=${token}`);
        const matches = response.data.data;

        const spinner = ora({
            text: 'LOADING SCORE....',
            spinner: 'point',
            indent: 2,
            interval: 80,
            color: 'yellow',
            stream: process.stdout,
            isEnabled: true,
            hideCursor: true
          }).start();

        let foundMatch = false;

        matches.forEach(match => {
            if (match.series === 'Indian Premier League 2025') {
                const matchTime = match.dateTimeGMT;
                // console.log(matchTime)
                const matchDate = new Date(matchTime);
                const matchDay = matchDate.getDate();
                const matchMonth = matchDate.getMonth();
                if (currentDay() == matchDay && currentMonth() == matchMonth) {
                    spinner.stop()
                    foundMatch = true;

                    // console.log(match)

                    const Series = match.series;
                    const team1 = match.t1;
                    const team2 = match.t2;
                    const score1 = match.t1s;
                    const score2 = match.t2s;
                    const matchStatus = match.status;
                    
                    console.log(chalk.blueBright(Series) + "\n")
                    console.log("******TEAMS****** \n")
                    console.log(chalk.green(team1) + " : " + chalk.yellow(score1) + "\n")
                    console.log(chalk.green(team2) + " : " + chalk.yellow(score2) + "\n")  
                    console.log(chalk.red(matchStatus));  
                }
            }
        });

        if (!foundMatch) {
            spinner.stop();
            console.log(chalk.red("No live IPL match today."));
        }
    } 
    catch (error) {
        console.log(error)
    }
    
}