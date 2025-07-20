pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'p-ingfo'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Invesgood/P-Ingfo.git'
            }
        }

        stage('Environment Setup') {
            steps {
                script {
                    // Buat file .env kalau belum ada
                    sh '''
                        if [ ! -f ".env" ]; then
                            echo "DB_PASSWORD=defaultpass" >> .env
                            echo "JWT_SECRET=defaultjwtsecret" >> .env
                            echo "Created default .env file."
                        else
                            echo ".env already exists."
                        fi
                    '''
                }
            }
        }

        stage('Stop Existing Services') {
            steps {
                echo 'Stopping any existing containers...'
                sh "docker-compose -p ${PROJECT_NAME} down || true"
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'Building and starting services...'
                sh """
                    docker-compose -p ${PROJECT_NAME} build --no-cache
                    docker-compose -p ${PROJECT_NAME} up -d
                """
            }
        }

        stage('Health Check') {
            steps {
                script {
                    echo 'Waiting for services to start...'
                    sh 'sleep 15'

                    echo 'Checking backend on port 98...'
                    sh 'curl -f http://localhost:98/api/tasks || (echo "❌ Backend FAILED" && exit 1)'

                    echo 'Checking frontend on port 99...'
                    sh 'curl -f http://localhost:99 || (echo "❌ Frontend FAILED" && exit 1)'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up unused Docker volumes...'
            sh 'docker system prune -f --volumes'
        }

        failure {
            echo 'Pipeline failed. Showing docker logs...'
            sh "docker-compose -p ${PROJECT_NAME} logs || true"
        }

        success {
            echo '✅ Deployment successful! 🎉'
        }
    }
}
