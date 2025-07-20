pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Invesgood/P-Ingfo.git'
            }
        }

        stage('Stop Previous Containers') {
            steps {
                script {
                    // Hentikan dan hapus semua container dari docker-compose, jika ada
                    sh 'docker-compose down || true'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
