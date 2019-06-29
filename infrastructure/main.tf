provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_instance" "modern-frontend-api" {
  ami           = "ami-056ee704806822732"
  instance_type = "t2.micro"
  key_name   = "modern_frontend_api"
}
