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
				sh './node_modules/mocha/bin/mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./test/reports/file.xml'
				junit '**/JUnitsReports/*.xml'
			}
		}
		stage ('Build TimeIPWebApp Image') {
			steps {
				sshPublisher(publishers: [sshPublisherDesc(configName: 'dockercentos', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 
				'''
				sh 'cd $WORKSPACE'
				sh 'docker build . --tag forcepoint/time-ip-web-app'
				'''
				, execTimeout: 300000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
			}
		}
	}	
}