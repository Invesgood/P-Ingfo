pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Invesgood/P-Ingfo.git'
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
