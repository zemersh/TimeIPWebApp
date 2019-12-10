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
				sshPublisher(publishers: [sshPublisherDesc(configName: 'dockercentos', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 
				'''
				cd /home/zemersh/docker/jenkins/jenkins_home/workspace/TimeIPWebApp
				BUILD_VERSION=$(node -pe "require('./package.json').version")
				cd /home/zemersh/docker/jenkins/jenkins_home/workspace/
				echo $BUILD_TIMESTAMP
				NAME='TimeIPWebApp'
				UNDERS='_'
				FILE=$NAME$UNDERS$BUILD_TIMESTAMP$UNDERS$BUILD_VERSION.zip
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
				docker build . --tag forcepoint/time-ip-web-app:$(node -pe "require('./package.json').version")
				docker tag forcepoint/time-ip-web-app:$(node -pe "require('./package.json').version") forcepoint/time-ip-web-app:latest
				'''
				, execTimeout: 300000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
			}
		}
	}	
}