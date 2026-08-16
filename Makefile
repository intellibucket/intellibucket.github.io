.DEFAULT_GOAL := help

NPM ?= npm

.PHONY: help install dev build start lint test check db-generate

help:
	@echo "Available commands:"
	@echo "  make install      Install locked dependencies"
	@echo "  make dev          Start the development server"
	@echo "  make build        Create a production build"
	@echo "  make start        Start the production server"
	@echo "  make lint         Run code quality checks"
	@echo "  make test         Build and run the test suite"
	@echo "  make check        Run lint and tests"
	@echo "  make db-generate  Generate database migrations"

install:
	$(NPM) ci

dev:
	$(NPM) run dev

build:
	$(NPM) run build

start:
	$(NPM) run start

lint:
	$(NPM) run lint

test:
	$(NPM) test

check: lint test

db-generate:
	$(NPM) run db:generate
