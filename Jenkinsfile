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
		stage ('Copy Artifacts') {
			steps {
				powershell '''
				Write-Host "ROBOCOPY is about to start copying Navy artifacts for Advanced Installer build" -NoNewLine
				'''
			}
		}
	}	
}