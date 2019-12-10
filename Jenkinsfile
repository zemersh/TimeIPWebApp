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
				sh './node_modules/mocha/bin/mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./JUnitsReports/result.xml'
				junit '**/JUnitsReports/*.xml'
			}
		}
		stage ('Create Artifactory and sending it to management server') {
			steps {
				sh '$BUILD_VERSION = node -pe "require('./package.json').version"
				sh 'echo $BUILD_VERSION'
				sh 'echo $BUILD_TIMESTAMP'
				sshPublisher(publishers: [sshPublisherDesc(configName: 'dockercentos', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 
				'''
				cd /home/zemersh/docker/jenkins/jenkins_home/workspace/
				echo $BUILD_VERSION
				echo $BUILD_TIMESTAMP
				#!bin/sh
				FILE="TimeIPWebApp" + "_" + "$BUILD_VERSION" + "_" + "$BUILD_TIMESTAMP" + ".zip"
				zip -r $FILE TimeIPWebApp
				curl -uadmin:AP4yfeptHCJX84gEtWXZ8TjRYQQ -T $FILE "http://dockercentos:8081/artifactory/generic-local/$FILE"
				'''
				, execTimeout: 300000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
			}
		}
		stage ('Build TimeIPWebApp Image') {
			steps {
				sshPublisher(publishers: [sshPublisherDesc(configName: 'dockercentos', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 
				'''
				cd /home/zemersh/docker/jenkins/jenkins_home/workspace/TimeIPWebApp/
				docker build . --tag forcepoint/time-ip-web-app
				'''
				, execTimeout: 300000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
			}
		}
	}	
}