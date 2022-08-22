package com.example.Calculator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin(origins="http://localhost:4200/")
@SpringBootApplication
@RequestMapping(value="cal")
public class calculator extends SpringBootServletInitializer{
    public static double res=0;
    public static String equation="";
	public String Addition( String x, String y){
		double num1=Double.parseDouble(x);
		double num2=Double.parseDouble(y);
		res=num1+num2;
		return Double. toString(num1+num2);
	}
	public String multiplication( String x, String y){
		double num1=Double.parseDouble(x);
		double num2=Double.parseDouble(y);
		res=num1*num2;
		return Double. toString(res);
	}
	public String subtraction( String x, String y){
		double num1=Double.parseDouble(x);
		double num2=Double.parseDouble(y);
		res=num1-num2;
		return Double. toString(res);
	}
	public String Divison( String x, String y){
		double num1=Double.parseDouble(x);
		double num2=Double.parseDouble(y);
		if(num1<0) {
			return ("E");
		}else {
			res = num1/num2;
	         return Double. toString (res);
		}
	}
	public String power(String x){
		double num1=Double.parseDouble(x);
	          res = num1*num1;
	          return Double. toString (res);
	}
	@GetMapping("inverse")
	public String inverse(@RequestParam String x){
		double num1=Double.parseDouble(x);
		if(num1==0) {
			 return ("E");

		}else {
			res = 1/num1;
	         return Double. toString (res);
		}
		}
		public String squareroot(String x){
			double num1=Double.parseDouble(x);
			if(num1<0){
				return "E";
			}
			else {
				return Double.toString(Math.sqrt(num1));
			}
		}
		@GetMapping("/plusminus")
		public String plustominus(String x){
			double num1=Double.parseDouble(x);
			if(num1==0){
				return "0";
			}
			else {
				return Double.toString((-1)*num1);
			}
		}
		@GetMapping("/percent")
		public String percentage(@RequestParam String operation,@RequestParam String x,@RequestParam String y){
			double num1=Double.parseDouble(x);
			double num2=Double.parseDouble(y);
			System.out.print(x+" "+operation+" "+y);
			System.out.println(num1+" "+operation+" "+num2);
			if(operation.equals(" ")) {			System.out.println(num1+" "+operation+" "+num2+"plus");
return Double.toString(num1+num1*(num2/100));}
			else if(operation.equals("-")){ 			System.out.println(num1+" "+operation+" "+num2+"minus");
return Double.toString(num1-num1*(num2/100));}
			else if(operation.equals("X")) 	{		System.out.println(num1+" "+operation+" "+num2+"multiply"); return Double.toString(num1*(num2/100));}
			else if(operation.equals("/")) {			System.out.println(num1+" "+operation+" "+num2+"division");
          return Double.toString(num1/(num2/100));}
			else return Double.toString(res);
		}
		@GetMapping("/square")
		public String sqrt(@RequestParam String x){
			double num1=Double.parseDouble(x);
			return Double.toString(Math.sqrt(num1));
		}
		@GetMapping("evaluate")
		public String eval(@RequestParam String z,@RequestParam String x,@RequestParam String y){
		switch(z) {
		    case " ":
		    	equation=Addition(x,y);
		    	System.out.print(equation);
			    break;
			case "-":
				equation= subtraction(x,y);
				break;
		    case "X":
		    	equation= multiplication(x,y);
			    break;
		     case "²":
		    	 equation= power(x);
				 break;
		     case "/":
		    	 equation= Divison(x,y);
				break;
			default:
				equation= "E";
				break;
		}
		return(equation);
		}

		}

