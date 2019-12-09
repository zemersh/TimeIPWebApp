pipeline {
	agent any
	
	tools {org.jenkinsci.plugins.docker.commons.tools.DockerTool}
	
	options {
		timestamps ()
	}
	stages {  
		stage ('Git - Checkout') {
			steps {
				checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/zemersh/TimeIPWebApp.git']]]) 
			}
		}
		stage ('Build TimeIPWebApp Image') {
			steps {
				sh 'cd $WORKSPACE'
				sh 'docker build . --tag forcepoint/time-ip-web-app'
			}
		}
	}	
}