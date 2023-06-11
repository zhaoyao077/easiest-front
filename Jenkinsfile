pipeline {
    agent any
    tools {
        nodejs "MyNodeJS"
    }
    stages {
        stage ('Checkout') {
            steps {
                git branch: 'main', credentialsId: '5196d8fe-263e-4b55-a3d7-1ade49e45f3c', url: 'https://git.nju.edu.cn/40/sentistrength-frontend.git'
            }
        }
        stage ('Build') {
            steps {
                sh 'test -e *.tar.gz && rm *.tar.gz || :'
                sh 'npm install'
            }
        }
        stage ('Archive') {
            steps {
                sh 'tar czf sentistrength-front-$BUILD_NUMBER.tar.gz node_modules public src *.config.js *.json'
                archiveArtifacts artifacts: '*.tar.gz', followSymlinks: false
                updateGitlabCommitStatus name: 'build', state: 'success'
            }
        }
    }
}
