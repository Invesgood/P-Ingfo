pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'your-app-name'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Environment Setup') {
            steps {
                script {
                    // Copy environment variables
                    sh 'cp .env.example .env'
                    
                    // You can also use Jenkins credentials here
                    withCredentials([
                        string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                        string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')
                    ]) {
                        sh '''
                            sed -i "s/your_password/${DB_PASSWORD}/" .env
                            sed -i "s/your_very_secret_jwt_key_here/${JWT_SECRET}/" .env
                        '''
                    }
                }
            }
        }
        
        stage('Stop Existing Services') {
            steps {
                script {
                    sh 'docker-compose -p ${PROJECT_NAME} down || true'
                }
            }
        }
        
        stage('Build and Deploy') {
            steps {
                script {
                    sh '''
                        docker-compose -p ${PROJECT_NAME} build --no-cache
                        docker-compose -p ${PROJECT_NAME} up -d
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Wait for services to start
                    sh 'sleep 30'
                    
                    // Check if services are running
                    sh '''
                        docker-compose -p ${PROJECT_NAME} ps
                        
                        # Check backend health
                        curl -f http://localhost:5000/health || exit 1
                        
                        # Check frontend
                        curl -f http://localhost:3000 || exit 1
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Clean up build artifacts but keep running containers
                sh 'docker system prune -f --volumes'
            }
        }
        
        failure {
            script {
                // On failure, show logs for debugging
                sh 'docker-compose -p ${PROJECT_NAME} logs'
            }
        }
        
        success {
            echo 'Deployment successful! 🎉'
        }
    }
}