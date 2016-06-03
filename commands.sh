#!/bin/bash

# GIT
# Git Clone
alias gc='git clone'
# Git Status
alias gs='git status'
# Git Commit Message
alias gcm='git commit -m'
# Git Add All
alias gaa='git add .'
# Git Add Something
alias gas='git add'
# Git Checkout Branch
alias gcb='git checkout'
# Git Push Origin
alias gpo='git push origin'
# Gi Log Oneline
alias glo='git log --oneline'
# Git Log Colors Graph
alias glcg="git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# NPM
# Npm Install
alias ni='npm install'
# Npm Install --Save
alias nis='npm i -S'
# Npm Install --save-Dev
alias nid='npm i -D'
# Npm Install Global
alias nig='npm i -g'
# Npm Run test
alias nrt='npm run test'
# Npm Run
alias nr='npm run'
# Npm Outdated
alias no='npm outdated'

# BUILD
# Gulp Watch
alias gw='gulp -w'
# Gulp Deploy
alias gd='gulp deploy'
# Jekyll Serve
alias js='jekyll serve'
# Kill Server
alias ks="kill $(ps aux | grep '[j]ekyll' | awk '{print $2}')"
