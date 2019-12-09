pipeline {
	agent any
	
	tools {nodejs "nodejs"}
	
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
				sh 'cd $WORKSPACE'
				sh 'npm install'
				sh 'npm test'
			}
		}
		stage ('Build TimeIPWebApp Image') {
			steps {
				sh 'cd $WORKSPACE'
				def dockerHome = tool 'docker'
				env.PATH = "${dockerHome}/bin:${env.PATH}"
				sh 'docker build . --tag forcepoint/time-ip-web-app'
			}
		}
	}	
}