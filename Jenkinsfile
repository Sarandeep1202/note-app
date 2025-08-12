pipeline {
    agent any
    
    environment {
        APP_NAME = 'notetaking-app'
        DEPLOY_DIR = '/var/www/html'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                // Code is automatically checked out by Jenkins
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                // For static HTML app, we might install development tools
                sh 'npm --version || echo "Node.js not required for static app"'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Basic file validation
                sh '''
                    echo "Validating HTML files..."
                    if [ -f "index.html" ]; then
                        echo "✅ index.html found"
                    else
                        echo "❌ index.html missing"
                        exit 1
                    fi
                    
                    if [ -f "script.js" ]; then
                        echo "✅ script.js found"
                    else
                        echo "❌ script.js missing"
                        exit 1
                    fi
                    
                    if [ -f "style.css" ]; then
                        echo "✅ style.css found"
                    else
                        echo "❌ style.css missing"
                        exit 1
                    fi
                '''
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                // For static app, we might minify files or run build processes
                sh '''
                    echo "Creating build directory..."
                    mkdir -p build
                    
                    echo "Copying files to build directory..."
                    cp index.html build/
                    cp script.js build/
                    cp style.css build/
                    
                    echo "Build completed successfully"
                    ls -la build/
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh '''
                    echo "Stopping Apache service..."
                    sudo systemctl stop httpd
                    
                    echo "Backing up previous deployment..."
                    sudo mkdir -p /var/www/html/backup
                    sudo cp -r /var/www/html/* /var/www/html/backup/ 2>/dev/null || echo "No previous files to backup"
                    
                    echo "Deploying new files..."
                    sudo cp -r build/* /var/www/html/
                    
                    echo "Setting proper permissions..."
                    sudo chown -R apache:apache /var/www/html/
                    sudo chmod -R 644 /var/www/html/*
                    
                    echo "Starting Apache service..."
                    sudo systemctl start httpd
                    
                    echo "Deployment completed successfully"
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                sh '''
                    echo "Checking Apache service status..."
                    sudo systemctl is-active httpd
                    
                    echo "Checking if app is accessible..."
                    sleep 5
                    curl -f http://localhost/ || echo "Warning: Health check failed"
                    
                    echo "Listing deployed files..."
                    ls -la /var/www/html/
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed'
            // Clean up build directory
            sh 'rm -rf build'
        }
        success {
            echo '✅ Pipeline executed successfully!'
            // You could add notifications here
        }
        failure {
            echo '❌ Pipeline failed!'
            // You could add failure notifications here
        }
    }
}
