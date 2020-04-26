/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.simple.core.base.user.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
//import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//import com.simple.core.base.user.service.MyUserDetailsService;

//import org.springframework.context.annotation.AdviceMode;
import org.springframework.http.HttpStatus;

//import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Bean
	public Filter customFilter() {
		return new Filter() {

			@Override
			public void destroy() {
				// TODO Auto-generated method stub

			}

			@Override
			public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
					throws IOException, ServletException {
				// TODO Auto-generated method stub
				HttpServletRequest request = (HttpServletRequest) req;  
				
				//System.out.println("Filter Get referer:" +request.getHeader("referer") + "path:" + request.getContextPath());
				 chain.doFilter(req,res); 
			}

			@Override
			public void init(FilterConfig arg0) throws ServletException {
				// TODO Auto-generated method stub

			}

		};
	}

	// @Autowired
	// MyUserDetailsService userInfoService;
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
		.authorizeRequests()
			.antMatchers("/css/**", "/index","/img","/js").permitAll()
			.antMatchers("/admin/user/welcome").permitAll()
			.antMatchers("/admin/user/login").permitAll()
			.antMatchers("/admin/user/").permitAll()
			.antMatchers("/admin/**").authenticated()
			.antMatchers("/client/user/welcome").permitAll()
			.antMatchers("/client/user/login").permitAll()
			.antMatchers("/client/user/").permitAll()
			.antMatchers("/client/**").authenticated();
		//http.addFilterBefore(customFilter(),UsernamePasswordAuthenticationFilter.class);
	  
		http.formLogin().loginPage("/user/login").loginProcessingUrl("/login").failureUrl("/user/login")
		//.defaultSuccessUrl("/client/product/")
		.successHandler(new SimpleLoginSuccessHandler("/user/home"));
		http.logout().permitAll().logoutUrl("/logout").logoutSuccessUrl("/user/welcome");
		http.csrf().disable(); //permist csrf.
		http.headers().frameOptions().sameOrigin();//Permit cross origin frame source display.
		http.exceptionHandling().accessDeniedPage("/403");
	
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth,
			@Qualifier("myUserDetailsService") UserDetailsService userDetailsService) throws Exception {
		auth.userDetailsService(userDetailsService);// .passwordEncoder(new
													// BCryptPasswordEncoder());
		/*
		 * auth .inMemoryAuthentication()
		 * .withUser("user").password("123456").roles("USER");
		 */
	}

}
