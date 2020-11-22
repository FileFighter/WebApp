// sorry but this doesnt work in TypeScript pls dont kill me.
const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://filefighter.ddns.net:9000',
        options: {
            'sonar.projectKey': "de.filefighter.frontend",
            'sonar.projectName': "Frontend",
            'sonar.projectDescription': "Frontend for FileFighter",
            'sonar.login': process.env.SONAR_LOGIN,
            'sonar.password': process.env.SONAR_PASSWORD
        }
    },
    () => process.exit()
)
