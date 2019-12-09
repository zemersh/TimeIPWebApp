pipeline {
	agent any
	options {
		timestamps ()
	}
	stages {  
		stage ('Git - Checkout') {
			steps {
				checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/zemersh/TimeIPWebApp.git']]]) 
			}
		}
		stage ('Unit test') {
			steps {
				mocha/chai + report
			}
		}
		stage ('Build Image') {
			steps {
				dockerfile
			}
		}
		stage ('Kubernetes deploy') {
			steps {
				dockerfile
			}
		}
	}	
}